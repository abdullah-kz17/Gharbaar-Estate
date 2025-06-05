// models/favoriteServiceModel.js
const mongoose = require("mongoose");

const favoriteServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true,
    },
}, { timestamps: true });

favoriteServiceSchema.index({ userId: 1, serviceProviderId: 1 }, { unique: true });

module.exports = mongoose.model("FavoriteService", favoriteServiceSchema);
