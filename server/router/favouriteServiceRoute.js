// routes/favoriteServiceRoutes.js
const express = require("express");
const router = express.Router();
const {
    addToFavoriteServices,
    removeFromFavoriteServices,
    getFavoriteServices
} = require("../controllers/favouriteServiceController");
const  protect  = require("../middlewares/authMiddleware");

router.post("/", protect, addToFavoriteServices);
router.delete("/:serviceProviderId", protect, removeFromFavoriteServices);
router.get("/", protect, getFavoriteServices);

module.exports = router;
