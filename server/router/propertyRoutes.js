const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware'); // Create this for admin restriction
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    approveProperty,
    banProperty,
    featureProperty,
    getUserProperties, getPendingProperties, searchPropertiesByPrompt, adminDeleteProperty
} = require('../controllers/propertyController');
const { uploadPropertyImages } = require('../config/cloudinary/userProperties');

// ✅ Create a new property (Protected + Image Upload)
router.post('/create', protect, uploadPropertyImages.array('images', 10), createProperty);

// ✅ Get all properties (Public or admin)
router.get('/', getAllProperties);

// Search Property by Prompt
router.post('/search', searchPropertiesByPrompt);

// ✅ Get single property by ID (Public)
router.get('/:id', getPropertyById);

// ✅ Update property by ID (Protected)
router.put('/update/:id', protect, uploadPropertyImages.array('images', 10), updateProperty);

// ✅ Delete property by ID (Protected)
router.delete('/delete/:id', protect, deleteProperty);

// ✅ Get all properties created by logged-in user
router.get('/user/properties', protect, getUserProperties);

// ✅ Admin: Approve property
router.patch('/approve/:id', protect, adminMiddleware, approveProperty);

// ✅ Admin: Ban property
router.patch('/ban/:id', protect, adminMiddleware, banProperty);

// ✅ Admin: Feature property
router.patch('/feature/:id', protect, adminMiddleware, featureProperty);

// ✅ Admin: Delete property
router.delete('/admin/delete/:id', protect, adminMiddleware, adminDeleteProperty);

// Admin : Pending approvals
router.get('/approval/pending-properties', protect, adminMiddleware,getPendingProperties);

module.exports = router;
