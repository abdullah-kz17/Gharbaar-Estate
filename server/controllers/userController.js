const User = require("../models/userModel.js");

// @desc Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find().select("-password").skip(skip).limit(limit),
            User.countDocuments()
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({ users, total, page, totalPages });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// @desc Get single user
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
};

// @desc Make user an admin
exports.makeAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: "admin" },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User promoted to admin", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to update role" });
    }
};

// @desc Demote admin to regular user
exports.removeAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: "user" },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Admin role removed", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to update role" });
    }
};

// @desc Soft delete user
exports.softDeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
