const mongoose = require("mongoose");
const slugify = require("slugify");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },

    slug: {
        type: String,
        unique: true,
        index: true,
    },

    content: {
        type: String,
        required: true,
        minlength: 50,
    },

    excerpt: {
        type: String,
        maxlength: 300,
    },

    tags: {
        type: [String],
        default: [],
    },

    category: {
        type: String,
        enum: [
            "Property Buying",
            "Property Selling",
            "AI Tools",
            "Renovation Tips",
            "Interior Design",
            "Neighborhood Guides",
            "Market Predictions",
            "Maintenance Advice",
            "Other"
        ],
        default: "Other",
    },

    featuredImage: {
        type: String,
        default: "",
    },

    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },

    isFeatured: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    comments: [commentSchema],

    relatedProperty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        default: null,
    },

}, {
    timestamps: true,
});

// Auto-generate slug
blogSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Text search index
blogSchema.index({
    title: "text",
    content: "text",
    tags: "text",
    category: "text"
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
