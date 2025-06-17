const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const protect = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { uploadBlogImage } = require("../config/cloudinary/blogImages");


router.post(
    "/",
    protect,
    adminMiddleware,
    uploadBlogImage.single("featuredImage"),
    blogController.createBlog
);
router.get("/", blogController.getAllBlogs);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.put(
    "/:id",
    protect,
    adminMiddleware,
    uploadBlogImage.single("featuredImage"),
    blogController.updateBlog
);
router.delete("/:id", protect, adminMiddleware, blogController.deleteBlog);
router.post("/:id/like", protect, blogController.toggleLike);
router.post("/:id/comments", protect, blogController.addComment);
router.put("/:id/comments/:commentId", protect, blogController.updateComment);
router.delete("/:id/comments/:commentId", protect, blogController.deleteComment);

module.exports = router;
