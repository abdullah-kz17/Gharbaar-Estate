const express = require("express");
const router = express.Router();
const {
    addToFavorites,
    removeFromFavorites,
    getUserFavorites
} = require("../controllers/favouriteController");
const protect = require("../middlewares/authMiddleware");

// All routes require authentication
router.use(protect);

// POST /api/favorites - Add a property to favorites
router.post("/", addToFavorites);

// DELETE /api/favorites/:propertyId - Remove from favorites
router.delete("/:propertyId", removeFromFavorites);

// GET /api/favorites - Get all favorites of logged-in user
router.get("/", getUserFavorites);

module.exports = router;
