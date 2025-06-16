const express = require('express');
const router = express.Router();

const {
    register,
    login,
    updateProfile,
    forgotPassword,
    resetPassword,
    // verifyOtp,
    // sendOtp,
    verifyEmail,
    getCurrentUser,
    // Rate limiters
    loginLimiter,
    registerLimiter,
    forgotPasswordLimiter,
    sendOtpLimiter, resendVerificationEmail
} = require('../controllers/authController');

const {
    registerValidator,
    loginValidator,
    updateProfileValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    verifyOtpValidator,
    sendOtpValidator,
} = require('../validators/userValidator');

const validateRequest = require('../middlewares/validateRequest');
const protect = require('../middlewares/authMiddleware');
const { uploadUserProfile } = require("../config/cloudinary/userProfile");

// Auth and user routes
router.post(
    '/register',
    registerLimiter,
    uploadUserProfile.single('profilePic'),
    registerValidator,
    validateRequest,
    register
);

router.post(
    '/login',
    loginValidator,
    validateRequest,
    login
);

router.put(
    '/profile',
    protect,
    uploadUserProfile.single('profilePic'),
    updateProfileValidator,
    validateRequest,
    updateProfile
);

router.post(
    '/forgot-password',
    forgotPasswordLimiter,
    forgotPasswordValidator,
    validateRequest,
    forgotPassword
);

router.post(
    '/reset-password/:token',
    resetPasswordValidator,
    validateRequest,
    resetPassword
);

// router.post(
//     '/send-otp',
//     sendOtpLimiter,
//     sendOtpValidator,
//     validateRequest,
//     sendOtp
// );

// router.post(
//     '/verify-otp',
//     verifyOtpValidator,
//     validateRequest,
//     verifyOtp
// );

router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.get('/me', protect, getCurrentUser);

module.exports = router;
