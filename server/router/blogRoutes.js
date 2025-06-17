const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const protect = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { uploadBlogImage } = require("../config/cloudinary/blogImages");

// Create blog
router.post(
    "/",
    protect,
    adminMiddleware,
    uploadBlogImage.single("featuredImage"),
    blogController.createBlog
);

// Get all blogs
router.get("/", blogController.getAllBlogs);

// Get blog by slug (specific route)
router.get("/slug/:slug", blogController.getBlogBySlug);

// Get blog by ID (parameterized route)
router.get("/:id", blogController.getBlogById);

// Update blog
router.put(
    "/:id",
    protect,
    adminMiddleware,
    uploadBlogImage.single("featuredImage"),
    blogController.updateBlog
);

// Delete blog
router.delete("/:id", protect, adminMiddleware, blogController.deleteBlog);

// Like blog
router.post("/:id/like", protect, blogController.toggleLike);

// Comment routes
router.post("/:id/comments", protect, blogController.addComment);
router.put("/:id/comments/:commentId", protect, blogController.updateComment);
router.delete("/:id/comments/:commentId", protect, blogController.deleteComment);

module.exports = router;
