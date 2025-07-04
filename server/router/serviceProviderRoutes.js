const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { uploadUserProfile } = require("../config/cloudinary/userProfile");

const {
    createServiceProvider,
    updateServiceProvider,
    getAllApprovedProviders,
    getMyServiceProvider,
    deleteServiceProvider,
    getFeaturedProviders,
    adminGetAllProviders,
    adminApproveProvider,
    adminToggleBanProvider,
    adminToggleFeatured,
    adminDeleteProvider,
    getServiceProviderById,
    reviewServiceProvider,
    deleteReview,
    getReviewsForProvider,
} = require("../controllers/serviceProviderController");

// ADMIN ROUTES
router.get("/admin/all", protect, adminMiddleware, adminGetAllProviders);
router.put("/admin/approve/:id", protect, adminMiddleware, adminApproveProvider);
router.put("/admin/ban/:id", protect, adminMiddleware, adminToggleBanProvider);
router.put("/admin/feature/:id", protect, adminMiddleware, adminToggleFeatured);
router.delete("/admin/:id", protect, adminMiddleware, adminDeleteProvider);

// USER ROUTES
router.post("/", protect, uploadUserProfile.single("image"), createServiceProvider);
router.get("/me", protect, getMyServiceProvider);
router.put("/", protect, uploadUserProfile.single("image"), updateServiceProvider);
router.delete("/", protect, deleteServiceProvider);
router.post("/review", protect, reviewServiceProvider);
router.delete("/review/:id", protect, deleteReview);
router.get("/reviews/:id", getReviewsForProvider);

// PUBLIC ROUTES — order matters!
router.get("/featured", getFeaturedProviders);
// GET all approved providers (supports ?page & ?limit for pagination)
router.get("/", getAllApprovedProviders);
router.get("/:id", getServiceProviderById);

module.exports = router;