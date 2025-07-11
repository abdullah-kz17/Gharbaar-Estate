# AI Flask Server

This Flask server provides AI-powered property renovation analysis using a PyTorch model.

## Setup

### 1. Install Dependencies

```bash
pip install torch torchvision flask pillow numpy opencv-python cloudinary python-dotenv
```

### 2. Environment Configuration

Create a `.env` file in the `ai` directory:

```env
# Flask Server Configuration
FLASK_HOST=0.0.0.0
FLASK_PORT=5001
FLASK_DEBUG=False

# Cloudinary Configuration (required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Model File

Ensure `renovation_model.pt` is in the `ai` directory.

## Running the Server

### Development
```bash
python predict.py
```

### Production
```bash
# Set environment variables
export FLASK_DEBUG=False
export FLASK_HOST=0.0.0.0
export FLASK_PORT=5001

python predict.py
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status and model information

### Prediction
- **POST** `/predict`
- Accepts image file in form data
- Returns renovation prediction and highlighted image

## Integration with Main Server

The main Node.js server will connect to this Flask server using the URL specified in the environment variables:

- **Development**: `LOCAL_FLASK_URL=http://localhost:5001`
- **Production**: `FLASK_SERVER_URL=https://your-flask-server-domain.com`

## Troubleshooting

1. **Model not loading**: Check if `renovation_model.pt` exists
2. **Cloudinary errors**: Verify Cloudinary credentials in `.env`
3. **Port conflicts**: Change `FLASK_PORT` in environment variables
4. **CUDA issues**: The server will automatically fall back to CPU if CUDA is unavailable 