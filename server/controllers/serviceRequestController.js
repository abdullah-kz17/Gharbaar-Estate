// controllers/requestController.js
const Request = require("../models/serviceRequestModel.js");
const ServiceProvider = require("../models/serviceProviderModel.js");
const User = require("../models/userModel.js");
const sendEmail = require("../config/sendEmail.js");

exports.createRequest = async (req, res) => {
    try {
        const { providerId, message } = req.body;

        const provider = await ServiceProvider.findById(providerId).populate("user", "email username");
        if (!provider) return res.status(404).json({ message: "Service provider not found" });

        const newRequest = await Request.create({
            user: req.user._id,
            provider: provider._id,
            message,
        });

        // Notify provider via email
        await sendEmail(
            provider.user.email,
            "New Service Request",
            `<p>You received a new request from ${req.user.username}.</p><p>Message: ${message}</p>`
        );

        res.status(201).json({ message: "Request sent", request: newRequest });
    } catch (err) {
        res.status(500).json({ message: "Failed to send request" });
    }
};

exports.getUserRequests = async (req, res) => {
    try {
        const requests = await Request.find({ user: req.user._id })
            .populate("provider", "businessName")
            .sort({ createdAt: -1 });

        res.status(200).json({ requests });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch requests" });
    }
};

exports.getProviderRequests = async (req, res) => {
    try {
        const provider = await ServiceProvider.findOne({ user: req.user._id });
        if (!provider) return res.status(403).json({ message: "Not a provider" });

        const requests = await Request.find({ provider: provider._id })
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({ requests });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch requests" });
    }
};

exports.respondToRequest = async (req, res) => {
    try {
        const { status, response } = req.body;
        const request = await Request.findById(req.params.id).populate("user", "email username");

        if (!request) return res.status(404).json({ message: "Request not found" });

        // Update status and response
        request.status = status || request.status;
        request.response = response || "";
        request.notified.user = false;
        await request.save();

        // Notify user via email
        await sendEmail(
            request.user.email,
            "Response to Your Service Request",
            `<p>Your request was ${status}.</p><p>Response: ${response}</p>`
        );

        res.status(200).json({ message: "Response sent", request });
    } catch (err) {
        res.status(500).json({ message: "Failed to respond" });
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request || request.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await request.deleteOne();
        res.status(200).json({ message: "Request deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete request" });
    }
};
