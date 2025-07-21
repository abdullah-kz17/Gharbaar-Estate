// router/aiRoutes.js
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/analyze-image', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;

        const form = new FormData();
        form.append('image', fs.createReadStream(filePath));

             // For local development:
     const flaskURL = 'http://127.0.0.1:5001/predict';
     // Or, if your Flask server runs on a different port, update accordingly.

        // const flaskURL = 'https://gharbaar-estate-ai.onrender.com/predict' || 'http://127.0.0.1:5001/predict' || 'http://localhost:5001/predict';

        const response = await axios.post(flaskURL, form, {
            headers: form.getHeaders(),
        })

        fs.unlinkSync(filePath);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('AI Prediction Error:', error.message);
        res.status(500).json({ success: false, message: 'Prediction failed', error: error.message });
    }
});

module.exports = router;
