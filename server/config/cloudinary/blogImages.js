const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'gharbaar-blog-images', // 👈 Custom folder for blog images
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 675, crop: 'limit' }],
    },
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP are allowed.'));
    }
};

const uploadBlogImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 4 * 1024 * 1024 }, // 4MB limit
});

module.exports = { uploadBlogImage };
