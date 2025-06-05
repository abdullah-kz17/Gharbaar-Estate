// validators/userValidators.js
const { body, param, query } = require('express-validator');

const registerValidator = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone')
        .isMobilePhone()
        .withMessage('Valid phone number is required'),
];

const loginValidator = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const updateProfileValidator = [
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Must be a valid email'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

const forgotPasswordValidator = [
    body('email').isEmail().withMessage('Valid email is required'),
];

const resetPasswordValidator = [
    param('token').notEmpty().withMessage('Reset token is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

const verifyOtpValidator = [
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

const sendOtpValidator = [
    body('phone')
        .isMobilePhone()
        .withMessage('Valid phone number is required'),
];

module.exports = {
    registerValidator,
    loginValidator,
    updateProfileValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    verifyOtpValidator,
    sendOtpValidator,
};
