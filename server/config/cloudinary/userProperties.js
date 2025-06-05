const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gharbaar-user-properties',
        allowed_formats: ['jpg', 'png', 'jpeg',  'webp'],
        transformation: [{ width: 1280, height: 720, crop: 'limit' }],
    },
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, JPEG ,Webp and PNG are allowed.'));
    }
};

const uploadPropertyImages = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadPropertyImages };
