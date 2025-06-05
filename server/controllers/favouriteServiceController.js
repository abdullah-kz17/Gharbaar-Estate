const FavoriteService = require("../models/favouriteServiceModel");

exports.addToFavoriteServices = async (req, res) => {
    try {
        const { serviceProviderId } = req.body;
        const userId = req.user._id;

        if (!serviceProviderId) {
            return res.status(400).json({ success: false, message: "serviceProviderId is required" });
        }

        // Check if already exists
        const existingFavorite = await FavoriteService.findOne({ userId, serviceProviderId });
        if (existingFavorite) {
            return res.status(200).json({ success: true, message: "Already in favorites", favorite: existingFavorite });
        }

        const newFavorite = await FavoriteService.create({ userId, serviceProviderId });

        res.status(201).json({ success: true, message: "Added to favorites", favorite: newFavorite });
    } catch (err) {
        console.error("Error adding to favorite services:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};


exports.removeFromFavoriteServices = async (req, res) => {
    try {
        const { serviceProviderId } = req.params;
        const userId = req.user._id;

        const result = await FavoriteService.findOneAndDelete({ userId, serviceProviderId });

        if (!result) {
            return res.status(404).json({ success: false, message: "Favorite not found" });
        }

        res.status(200).json({ success: true, message: "Removed from favorite services" });
    } catch (error) {
        console.error("removeFromFavoriteServices error:", error);
        res.status(500).json({ success: false, message: "Failed to remove from favorites", error: error.message });
    }
};

exports.getFavoriteServices = async (req, res) => {
    try {
        const favorites = await FavoriteService.find({ userId: req.user._id }).populate("serviceProviderId");
        res.status(200).json({ success: true, favorites });
    } catch (error) {
        console.error("getFavoriteServices error:", error);
        res.status(500).json({ success: false, message: "Failed to get favorites", error: error.message });
    }
};
