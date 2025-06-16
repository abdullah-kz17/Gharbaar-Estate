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

        const flaskURL = 'http://192.168.76.102:5001/predict';

        const response = await axios.post(flaskURL, form, {
            headers: form.getHeaders(),
        });

        fs.unlinkSync(filePath);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('AI Prediction Error:', error.message);
        res.status(500).json({ success: false, message: 'Prediction failed', error: error.message });
    }
});

module.exports = router;
