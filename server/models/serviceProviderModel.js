const mongoose = require("mongoose");
const {model} = require("mongoose");


const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

const serviceProviderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        businessName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        servicesOffered: [
            {
                type: String,
                enum: [
                    "Plumbing",
                    "Painting",
                    "Electrical",
                    "Renovation",
                    "Interior Design",
                    "Cleaning",
                    "Architecture",
                    "Furniture",
                    "Other",
                ],
            },
        ],
        image: {
            type: String,
            default: "",
        },
        location: {
            lat: Number,
            lng: Number,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },

        reviews: [reviewSchema],
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

serviceProviderSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
        this.averageRating = sum / this.reviews.length;
    }
};

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);
module.exports = ServiceProvider;