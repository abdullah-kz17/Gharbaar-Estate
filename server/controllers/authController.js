const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../config/generateToken");
const sendEmail = require("../config/sendEmail");
const sendSms = require("../config/sendSms");
// const redisClient = require("../config/redisClient");
const rateLimit = require("express-rate-limit");

// ========== Rate Limiters ==========
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: "Too many registrations from this IP, please try later." },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: "Too many password reset attempts, try again later." },
});

const sendOtpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.body.phone || req.ip,
  message: { message: "Too many OTP requests for this number." },
});

// ========== Controller Functions ==========

const register = async (req, res) => {
  try {
    let { username, email, password, address, phone } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res.status(400).json({ message: "Please input all fields", success: false });
    }

    email = email.trim().toLowerCase();
    phone = phone.replace(/\D/g, "");

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicUrl = req.file?.path || null;

    const user = await User.create({
      username,
      email,
      address,
      phone,
      password: hashedPassword,
      profilePic: profilePicUrl,
    });

    const emailToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(emailToken).digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URLS}/verify-email?token=${emailToken}&email=${user.email}`;
    const html = `<h2>Verify Your Email</h2><p>Click below to verify:</p><a href="${verificationUrl}">Verify Email</a>`;

    await sendEmail(user.email, "Verify Your Email", html);

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Error registering user", success: false });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both email and password", success: false });
    }

    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in", success: false });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login", success: false });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URLS}/reset-password/${resetToken}`;
    const html = `<p>Reset your password using this link: <a href="${resetUrl}">${resetUrl}</a></p>`;

    await sendEmail(user.email, "Password Reset", html);

    res.status(200).json({ message: "Email sent", success: true });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token", success: false });

    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Invalid new password", success: false });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully", success: true });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getCurrentUser = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    const { username, email, password } = req.body;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Email already in use", success: false });
      }
      user.email = email;
    }

    if (username) user.username = username;
    if (password && password.length >= 6) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (req.file?.path) {
      user.profilePic = req.file.path;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const verifyEmail = async (req, res) => {
  const { email, token } = req.query;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email,
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(404).json({ message: "User not found", success: false });
  if (user.isEmailVerified) {
    return res.status(400).json({ message: "Email already verified", success: false });
  }

  user.isEmailVerified = true;
  user.emailVerifiedAt = new Date();
  await user.save();

  res.status(200).json({ message: "Email verified successfully", success: true });
};

const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required", success: false });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found", success: false });
    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified", success: false });
    }

    const emailToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(emailToken).digest("hex");

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URLS}/verify-email?token=${emailToken}&email=${user.email}`;
    const html = `<h2>Verify Your Email</h2><p>Click the link to verify your email:</p><a href="${verificationUrl}">Verify Email</a>`;

    await sendEmail(user.email, "Verify Your Email", html);

    res.status(200).json({ message: "Verification email sent successfully", success: true });

  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ message: "Error resending verification email", success: false });
  }
};

// const sendOtp = async (req, res) => {
//   const { phone } = req.body;
//   if (!phone) return res.status(400).json({ message: "Phone number is required", success: false });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//   try {
//     await redisClient.setEx(`otp:${phone}`, 300, hashedOtp);
//     await sendSms(phone, `Your verification code is: ${otp}`);

//     res.status(200).json({ message: "OTP sent", success: true });
//   } catch (error) {
//     console.error("Send OTP error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP", success: false });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { phone, otp } = req.body;
//   if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required", success: false });

//   const user = await User.findOne({ phone });
//   if (!user) return res.status(404).json({ message: "User not found", success: false });

//   try {
//     const storedHashedOtp = await redisClient.get(`otp:${phone}`);
//     const inputHashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//     if (!storedHashedOtp || storedHashedOtp !== inputHashedOtp) {
//       return res.status(400).json({ message: "Invalid or expired OTP", success: false });
//     }

//     user.isPhoneVerified = true;
//     user.phoneVerifiedAt = new Date();
//     await user.save();

//     await redisClient.del(`otp:${phone}`);
//     res.status(200).json({ message: "Phone number verified successfully", success: true });

//   } catch (error) {
//     console.error("OTP verification error:", error);
//     res.status(500).json({ message: "OTP verification failed", success: false });
//   }
// };

// ========== Exports ==========
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  verifyEmail,
  resendVerificationEmail,
  // sendOtp,
  // verifyOtp,
  getCurrentUser,
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  sendOtpLimiter,
};
