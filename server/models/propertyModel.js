const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    propertyType: {
        type: String,
        required: true,
        enum: ['House', 'Apartment', 'Plot', 'Commercial', 'Other'],
        default: 'House',
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    features: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    rooms: {
        beds: { type: Number, required: true },
        baths: { type: Number, required: true },
        kitchens: { type: Number, required: true },
        diningRooms: { type: Number, default: 0 },
    },
    furnishedStatus: {
        type: String,
        enum: ['Furnished', 'Semi-furnished', 'Unfurnished'],
        default: 'Unfurnished',
    },
    floors: { type: Number, default: 1 },
    lawnGarden: { type: Boolean, default: false },
    images: {
        type: [String],
        validate: [arrayLimit, 'Maximum 10 images are allowed'],
    },
    renovationRequired: { type: Boolean, default: false },
    renovationReason: { type: String, default: '' },
    contactInfo: {
        phone: String,
        email: String,
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
    isFeatured: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
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
