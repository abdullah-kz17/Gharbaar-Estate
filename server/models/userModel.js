const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  isServiceProvider: {
    type: Boolean,
    default: false,
  },
  serviceProviderProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    default: null,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerifiedAt: Date,

  emailVerificationToken: String,
  emailVerificationExpire: Date,

  phone: {
    type: String,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  phoneVerifiedAt: Date,

  address: String,

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  profilePic: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    enum: ["user", "admin", "moderator", "realtor"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
