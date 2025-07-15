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
        console.log('[AI ROUTE] Received file:', filePath);

        const form = new FormData();
        form.append('image', fs.createReadStream(filePath));

        const flaskURL = process.env.AI_SERVER_URL || 'https://gharbaar-estate-ai.onrender.com/predict';
        console.log('[AI ROUTE] Sending request to AI server:', flaskURL);

        const response = await axios.post(flaskURL, form, {
            headers: form.getHeaders(),
        });

        console.log('[AI ROUTE] AI server response:', response.status, response.data);
        fs.unlinkSync(filePath);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('[AI ROUTE] AI Prediction Error:', error.message);
        if (error.response) {
            console.error('[AI ROUTE] AI server error response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('[AI ROUTE] No response received from AI server:', error.request);
        } else {
            console.error('[AI ROUTE] Error setting up request:', error.message);
        }
        res.status(500).json({ success: false, message: 'Prediction failed', error: error.message });
    }
});

module.exports = router;
