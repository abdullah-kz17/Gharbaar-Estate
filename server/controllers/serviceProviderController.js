const ServiceProvider = require("../models/serviceProviderModel");
const User = require("../models/userModel");

// ---------------------- USER CONTROLS ----------------------

// Create
exports.createServiceProvider = async (req, res) => {
    try {
        const existing = await ServiceProvider.findOne({ user: req.user._id });
        if (existing) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const {
            businessName,
            description,
            address,
            servicesOffered,
            location,
        } = req.body;

        const newProvider = new ServiceProvider({
            user: req.user._id,
            businessName,
            description,
            address,
            servicesOffered: JSON.parse(servicesOffered || "[]"),
            location: location ? JSON.parse(location) : undefined,
            image: req.file ? req.file.path : "",
        });

        await newProvider.save(); // ✅ Only once

        await User.findByIdAndUpdate(req.user._id, {
            isServiceProvider: true,
            serviceProviderProfile: newProvider._id,
        });

        const populated = await newProvider.populate("user", "username email");

        res.status(201).json({ message: "Submitted for approval", data: populated });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating profile" });
    }
};

// Read own profile
exports.getMyServiceProvider = async (req, res) => {
    try {
        const provider = await ServiceProvider.findOne({ user: req.user._id }).populate(
            "user",
            "username email profilePic"
        );

        if (!provider) return res.status(404).json({ message: "No profile found" });
        res.status(200).json({ data: provider });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update own profile
exports.updateServiceProvider = async (req, res) => {
    try {
        const provider = await ServiceProvider.findOne({ user: req.user._id });
        if (!provider) return res.status(404).json({ message: "Profile not found" });

        const {
            businessName,
            description,
            address,
            servicesOffered,
            location,
        } = req.body;

        if (businessName) provider.businessName = businessName;
        if (description) provider.description = description;
        if (address) provider.address = address;
        if (servicesOffered) provider.servicesOffered = JSON.parse(servicesOffered);
        if (location) provider.location = JSON.parse(location);
        if (req.file) provider.image = req.file.path;

        await provider.save();
        const populated = await provider.populate("user", "username email profilePic");

        res.status(200).json({ message: "Profile updated", data: populated });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

// Delete own profile
exports.deleteServiceProvider = async (req, res) => {
    try {
        const provider = await ServiceProvider.findOne({ user: req.user._id });
        if (!provider) return res.status(404).json({ message: "Profile not found" });

        await ServiceProvider.findByIdAndDelete(provider._id);
        res.status(200).json({ message: "Profile deleted" });
    } catch (err) {
        res.status(500).json({ message: "Deletion failed" });
    }
};

// ---------------------- PUBLIC ----------------------

// Show all approved and not banned
// Show all approved and not banned, with filters
exports.getAllApprovedProviders = async (req, res) => {
    try {
        const { rating, service, city, search } = req.query;

        let filter = {
            isApproved: true,
            isBanned: false,
        };

        // 🌟 Filter by minimum average rating
        if (rating) {
            filter.averageRating = { $gte: parseFloat(rating) };
        }

        // 🌟 Filter by a specific service
        if (service) {
            filter.servicesOffered = { $in: [service] };
        }

        // 🌟 Filter by city or location
        if (city) {
            filter["location.city"] = { $regex: city, $options: "i" };
        }

        // 🌟 Keyword search (e.g., business name, description)
        if (search) {
            filter.$or = [
                { businessName: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { "location.city": { $regex: search, $options: "i" } },
            ];
        }

        const providers = await ServiceProvider.find(filter)
            .populate("user", "username email profilePic")
            .sort({ averageRating: -1 }); // optional: sort by rating

        res.status(200).json({ providers });
    } catch (err) {
        console.error("Filter error:", err);
        res.status(500).json({ message: "Fetch error with filters" });
    }
};


// Show featured providers
exports.getFeaturedProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find({
            isApproved: true,
            isFeatured: true,
            isBanned: false,
        }).populate("user", "username profilePic");

        res.status(200).json({ data: providers });
    } catch (err) {
        res.status(500).json({ message: "Fetch error" });
    }
};

// ---------------------- ADMIN CONTROLS ----------------------

// Admin: Get all providers
exports.adminGetAllProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find().populate("user", "username email profilePic");
        res.status(200).json({ data: providers });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Admin: Approve provider
exports.adminApproveProvider = async (req, res) => {
    try {
        const provider = await ServiceProvider.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        ).populate("user", "username email profilePic");

        res.status(200).json({ message: "Provider approved", data: provider });
    } catch (err) {
        res.status(500).json({ message: "Approval failed" });
    }
};

// Admin: Ban or Unban provider
exports.adminToggleBanProvider = async (req, res) => {
    try {
        const provider = await ServiceProvider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: "Not found" });

        provider.isBanned = !provider.isBanned;
        await provider.save();

        res.status(200).json({
            message: `Provider ${provider.isBanned ? "banned" : "unbanned"}`,
            data: provider,
        });
    } catch (err) {
        res.status(500).json({ message: "Ban toggle failed" });
    }
};

// Admin: Toggle featured status
exports.adminToggleFeatured = async (req, res) => {
    try {
        const provider = await ServiceProvider.findById(req.params.id);
        if (!provider) return res.status(404).json({ message: "Not found" });

        provider.isFeatured = !provider.isFeatured;
        await provider.save();

        res.status(200).json({
            message: `Provider ${provider.isFeatured ? "marked as" : "removed from"} featured`,
            data: provider,
        });
    } catch (err) {
        res.status(500).json({ message: "Feature toggle failed" });
    }
};

// Admin: Delete any provider
exports.adminDeleteProvider = async (req, res) => {
    try {
        await ServiceProvider.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Provider deleted", id: req.params.id });
    } catch (err) {
        res.status(500).json({ message: "Deletion failed" });
    }
};

exports.getServiceProviderById = async (req, res) => {
    try {
        const serviceId = req.params.id;

        const service = await ServiceProvider.findById(serviceId).populate(
            "user",
            "username email phone profilePic"
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Add or Update Review
exports.reviewServiceProvider = async (req, res) => {
    try {
        const userId = req.user._id;
        const { providerId, rating, comment } = req.body;

        if (!providerId || !rating) {
            return res.status(400).json({ message: "Provider ID and rating are required." });
        }

        const provider = await ServiceProvider.findById(providerId).populate("reviews.user", "username email profilePic");

        if (!provider) {
            return res.status(404).json({ message: "Service provider not found." });
        }

        // Check if user already submitted a review
        const existingReviewIndex = provider.reviews.findIndex(r => r.user._id.toString() === userId.toString());

        if (existingReviewIndex !== -1) {
            // Update existing review
            provider.reviews[existingReviewIndex].rating = rating;
            provider.reviews[existingReviewIndex].comment = comment;
            provider.reviews[existingReviewIndex].updatedAt = new Date();

        } else {
            // Add new review
            provider.reviews.push({
                user: userId,
                rating,
                comment,
                provider: provider._id
            });
        }

        // Recalculate average rating
        provider.calculateAverageRating();
        await provider.save();

        const updatedProvider = await ServiceProvider.findById(providerId).populate("reviews.user", "username email profilePic");

        const finalReview = updatedProvider.reviews.find(r => r.user._id.toString() === userId.toString());

        res.status(200).json({
            message: existingReviewIndex !== -1 ? "Review updated" : "Review submitted",
            review: finalReview, // ✅ now available in action.payload.review
            reviews: updatedProvider.reviews,
            averageRating: updatedProvider.averageRating
        });

    } catch (error) {
        console.error("Review error:", error);
        res.status(500).json({ message: "Server error while submitting review" });
    }
};

// Delete Review
exports.deleteReview = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const provider = await ServiceProvider.findById(id).populate("reviews.user", "username email profilePic");

        if (!provider) {
            return res.status(404).json({ message: "Service provider not found." });
        }

        const originalLength = provider.reviews.length;

        provider.reviews = provider.reviews.filter(r => r.user._id.toString() !== userId.toString());

        if (provider.reviews.length === originalLength) {
            return res.status(404).json({ message: "Review not found." });
        }

        provider.calculateAverageRating();
        await provider.save();

        res.status(200).json({
            message: "Review deleted",
            reviews: provider.reviews,
            averageRating: provider.averageRating
        });

    } catch (error) {
        console.error("Delete review error:", error);
        res.status(500).json({ message: "Server error while deleting review" });
    }
};


// Get All Reviews for a Service Provider
exports.getReviewsForProvider = async (req, res) => {
    const serviceId = req.params.id; // Ensure route parameter matches the URL
    console.log("Fetching reviews for serviceId:", serviceId);
    try {
        const provider = await ServiceProvider.findById(serviceId).populate({
            path: "reviews.user",
            select: "username profilePic email",
        });
        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }
        return res.status(200).json({
            reviews: provider.reviews,
            averageRating: provider.averageRating,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ message: "Error fetching reviews" });
    }
};

