// models/requestModel.js

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        response: {
            type: String,
            default: "",
        },
        notified: {
            user: { type: Boolean, default: false },
            provider: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
