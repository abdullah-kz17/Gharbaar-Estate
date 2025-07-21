import os
import uuid
import traceback
import tempfile

import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import numpy as np
import cv2
from flask import Flask, request, jsonify
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# Load environment variables from .env file (optional, for local dev)
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Flask app setup
app = Flask(__name__)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load PyTorch model
try:
    model = models.resnet50(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, 2)
    model.load_state_dict(torch.load("renovation_model.pt", map_location=device))
    model.to(device).eval()
    print("✅ Model loaded successfully on", device)
except Exception as e:
    print("❌ Model loading failed:", traceback.format_exc())
    raise RuntimeError("Model could not be loaded.")

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Upload image to Cloudinary
def upload_to_cloudinary(image_np):
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        success = cv2.imwrite(tmp.name, cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR))
        if not success:
            raise RuntimeError("cv2.imwrite failed to write image.")
        result = cloudinary.uploader.upload(tmp.name, folder="ai-predictions")
        return result.get("secure_url")

# Grad-CAM visualization
def grad_cam(image, model, class_idx=None):
    gradients = []
    activations = []

    def forward_hook(module, input, output):
        activations.append(output)

    def backward_hook(module, grad_in, grad_out):
        gradients.append(grad_out[0])

    conv_layer = model.layer4[-1]
    fwd = conv_layer.register_forward_hook(forward_hook)
    bwd = conv_layer.register_backward_hook(backward_hook)

    input_tensor = transform(image).unsqueeze(0).to(device)

    try:
        output = model(input_tensor)
        pred_class = output.argmax(dim=1).item() if class_idx is None else class_idx
        output[:, pred_class].backward()

        if not gradients or not activations:
            raise RuntimeError("Grad-CAM failed: no gradients or activations captured.")

        grads_val = gradients[0].squeeze().detach().cpu().numpy()
        acts_val = activations[0].squeeze().detach().cpu().numpy()

        weights = np.mean(grads_val, axis=(1, 2))
        cam = np.sum(weights[:, None, None] * acts_val, axis=0)
        cam = np.maximum(cam, 0)
        cam = cv2.resize(cam, (224, 224))
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)

        heatmap = np.uint8(255 * cam)
        heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
        img_np = np.array(image.resize((224, 224)))
        heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
        superimposed_img = np.uint8(heatmap * 0.4 + img_np * 0.6)

        highlight_url = upload_to_cloudinary(superimposed_img)
        return pred_class, highlight_url
    finally:
        fwd.remove()
        bwd.remove()

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "device": str(device),
        "cloudinary_configured": bool(os.getenv("CLOUDINARY_CLOUD_NAME"))
    })

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        img_file = request.files['image']
        try:
            image = Image.open(img_file.stream).convert("RGB")
        except Exception as e:
            return jsonify({"error": f"Invalid image file: {str(e)}"}), 400

        pred_class, highlight_url = grad_cam(image, model)
        label = "Renovated" if pred_class == 1 else "Needs Renovation"

        return jsonify({
            "prediction": label,
            "highlight_url": highlight_url
        })

    except Exception as e:
        print("❌ Error during /predict:", traceback.format_exc())
        return jsonify({
            "error": "Internal Server Error",
            "details": str(e)
        }), 500
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)    
