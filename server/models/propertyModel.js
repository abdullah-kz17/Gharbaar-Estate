const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    area: {
        type: String,
        required: true,
    },

    location: {
        address: {
            type: String,
            required: true,
        },
        coordinates: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
    },
    role: {
        type: String,
        enum: ['user', 'realtor', 'admin'],
    },

    features: {
        type: [String], // e.g., ['Garage', 'Balcony', 'Garden']
        default: [],
    },

    amenities: {
        type: [String], // e.g., ['Gas', 'Electricity', 'Water Supply']
        default: [],
    },

    rooms: {
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        kitchens: {
            type: Number,
            required: true,
        },
    },

    images: {
        type: [String], // Cloudinary URLs
        validate: [arrayLimit, 'Maximum 10 images are allowed'],
    },

    renovationRequired: {
        type: Boolean,
        default: false, // Set based on AI image analysis
    },

    renovationReason: {
        type: String,
        default: '', // Optional reason by model
    },

    contactInfo: {
        phone: String,
        email: String,
    },

    realtorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming Realtors are Users with role: 'moderator' or 'realtor'
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'banned', 'featured'],
        default: 'pending',
    },

    isFeatured: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Geo index for map search
propertySchema.index({ 'location.coordinates': '2dsphere' });

// Add text index for full-text search fallback
propertySchema.index({
    name: 'text',
    description: 'text',
    'location.address': 'text'
});


function arrayLimit(val) {
    return val.length <= 10;
}

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
