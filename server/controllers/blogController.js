const Blog = require("../models/blogModel");

// ✅ Create Blog (Admins only)
exports.createBlog = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can create blogs" });
        }

        const featuredImage = req.file?.path || "";

        const blog = new Blog({
            ...req.body,
            featuredImage,
            createdBy: req.user._id,
        });

        const saved = await blog.save();
        return res.status(201).json({ success: true, blog: saved });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Get All Published Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 9;
        const skip = (page - 1) * limit;
        const filter = { isDeleted: false, status: "published" };

        const [blogs, total] = await Promise.all([
            Blog.find(filter)
                .populate("createdBy", "username profilePic")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog.countDocuments(filter)
        ]);

        return res.json({
            success: true,
            blogs,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Get Single Blog by Slug (and increase views)
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug, isDeleted: false, status: "published" },
            { $inc: { views: 1 } },
            { new: true }
        )
            .populate("createdBy", "username profilePic")
            .populate("comments.user", "username profilePic");

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        return res.json({ success: true, blog });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Update Blog (Admins only, with optional image)
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (req.file?.path) {
            req.body.featuredImage = req.file.path;
        }

        Object.assign(blog, req.body);
        await blog.save();

        return res.json({ success: true, blog });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Soft Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        blog.isDeleted = true;
        blog.deletedAt = new Date();
        await blog.save();

        return res.json({ success: true, message: "Blog deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Toggle Like
exports.toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const userId = req.user._id;

        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const index = blog.likes.indexOf(userId);
        if (index === -1) {
            blog.likes.push(userId);
        } else {
            blog.likes.splice(index, 1);
        }

        await blog.save();
        return res.json({ success: true, liked: index === -1 });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Add Comment
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: "Content is required" });

        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const comment = {
            user: req.user._id,
            content,
            createdAt: new Date(),
        };

        blog.comments.push(comment);
        await blog.save();

        // Get the newly added comment with populated user data
        const populatedBlog = await Blog.findById(blog._id)
            .populate('comments.user', 'username profilePic');

        const newComment = populatedBlog.comments[populatedBlog.comments.length - 1];
        return res.json(newComment);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Update Comment
exports.updateComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const comment = blog.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (!comment.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You can only update your own comment." });
        }

        comment.content = req.body.content;
        await blog.save();

        return res.json({ success: true, message: "Comment updated" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        const commentIndex = blog.comments.findIndex(
            comment => comment._id.toString() === req.params.commentId
        );

        if (commentIndex === -1) return res.status(404).json({ message: "Comment not found" });

        const comment = blog.comments[commentIndex];
        if (!comment.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You can only delete your own comments." });
        }

        // Remove the comment using splice
        blog.comments.splice(commentIndex, 1);
        await blog.save();

        return res.json({ success: true, message: "Comment deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ✅ Get Blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Blog ID is required"
            });
        }

        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        )
            .populate("createdBy", "username profilePic")
            .populate("comments.user", "username profilePic");

        if (!blog) {
            console.log(`Blog not found with ID: ${id}`);
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        console.log(`Successfully retrieved blog with ID: ${id}`);
        return res.json({
            success: true,
            blog
        });
    } catch (err) {
        console.error("Error in getBlogById:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Error retrieving blog"
        });
    }
};
