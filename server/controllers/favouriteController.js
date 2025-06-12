const Favorite = require("../models/favouriteModel");

exports.addToFavorites = async (req, res) => {
    try {
        const { propertyId } = req.body;
        if (!propertyId) {
            return res.status(400).json({ success: false, message: "propertyId is required" });
        }

        const userId = req.user._id;

        // Upsert favorite (add if doesn't exist)
        const favorite = await Favorite.findOneAndUpdate(
            { userId, propertyId },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ success: true, message: 'Added to favorites', favorite });
    } catch (err) {
        console.error("addToFavorites error:", err);
        res.status(500).json({ success: false, message: 'Failed to add to favorites', error: err.message });
    }
};

exports.removeFromFavorites = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const userId = req.user._id;

        const result = await Favorite.findOneAndDelete({ userId, propertyId });
        if (!result) {
            return res.status(404).json({ success: false, message: "Favorite not found" });
        }

        res.status(200).json({
            success: true,
            message: 'Removed from favorites',
            propertyId: result.propertyId,        // <-- include the id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to remove from favorites', error: err.message });
    }
};


exports.getUserFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id }).populate('propertyId');
        res.status(200).json({ success: true, favorites });
    } catch (err) {
        console.error("getUserFavorites error:", err);
        res.status(500).json({ success: false, message: 'Failed to get favorites', error: err.message });
    }
};
