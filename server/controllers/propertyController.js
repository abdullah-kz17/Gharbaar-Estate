const Property = require('../models/propertyModel');
const mongoose = require('mongoose');
const stringSimilarity = require('string-similarity');

// Utility to safely parse JSON strings
const safeParse = (value) => {
    if (typeof value !== 'string') return value;
    try {
        return JSON.parse(value);
    } catch (e) {
        // Try to convert comma-separated strings to arrays
        if (value.includes(',')) {
            return value.split(',').map(item => item.trim());
        }
        console.warn("❗SafeParse failed for value:", value);
        return value;
    }
};

function parsePrice(text) {
    if (!text) return null;

    const croreMatch = text.match(/(\d+)\s*crore/i);
    if (croreMatch) return parseInt(croreMatch[1]) * 10000000;

    const lakhMatch = text.match(/(\d+)\s*lakh/i);
    if (lakhMatch) return parseInt(lakhMatch[1]) * 100000;

    // fallback: parse digits only
    const numberMatch = text.match(/\d+/);
    if (numberMatch) return parseInt(numberMatch[0]);

    return null;
}




// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const {
            name, propertyType, description, price, area, address, city, province,
            features, amenities, rooms, furnishedStatus, floors, lawnGarden,
            renovationRequired, renovationReason, contactInfo
        } = req.body;

        const userId = req.user?._id;

        // Validate required fields
        if (!name || !propertyType || !description || !price || !area || !address || !city || !province || !rooms) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        let parsedRooms, parsedFeatures, parsedAmenities, parsedContactInfo;
        try {
            parsedRooms = typeof rooms === 'string' ? JSON.parse(rooms) : rooms;
            parsedFeatures = features ? (typeof features === 'string' ? JSON.parse(features) : features) : [];
            parsedAmenities = amenities ? (typeof amenities === 'string' ? JSON.parse(amenities) : amenities) : [];
            parsedContactInfo = contactInfo ? (typeof contactInfo === 'string' ? JSON.parse(contactInfo) : contactInfo) : {};
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON structure in one of the fields.',
                error: err.message,
            });
        }

        const images = req.files?.map((file) => file.path) || [];
        if (images.length === 0) {
            console.warn("⚠️ No images uploaded or image parsing failed");
        }

        const newProperty = new Property({
            name,
            propertyType,
            description,
            price,
            area,
            address,
            city,
            province,
            features: parsedFeatures,
            amenities: parsedAmenities,
            rooms: parsedRooms,
            furnishedStatus,
            floors,
            lawnGarden,
            images,
            renovationRequired,
            renovationReason,
            contactInfo: parsedContactInfo,
            createdBy: userId,
            status: 'pending',
            isApproved: false
        });

        const saved = await newProperty.save();
        res.status(201).json({
            success: true,
            message: 'Property created and sent for admin approval.',
            property: saved,
        });
    } catch (err) {
        console.error('Property creation error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while creating property.',
            error: err.message,
        });
    }
};


// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
        const skip = (page - 1) * limit;
        const filter = { isApproved: true, isBanned: false };

        const [properties, total] = await Promise.all([
            Property.find(filter)
                .sort({ isFeatured: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('createdBy', 'username email role'),
            Property.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            properties,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching properties.',
            error: err.message,
        });
    }
};


// Get a single property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid property ID.' });
        }

        const property = await Property.findById(id)
            .populate('createdBy', 'username email role');

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found.' });
        }

        res.status(200).json({ success: true, property });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching property.',
            error: err.message,
        });
    }
};

// Update a property by ID (only creator can update)
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid property ID.' });
        }

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found.' });
        }

        // Authorization check
        if (property.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized. You can only update your own property.' });
        }

        const updates = req.body;

        // Parse JSON fields if needed
        if (updates.rooms) updates.rooms = typeof updates.rooms === 'string' ? JSON.parse(updates.rooms) : updates.rooms;
        if (updates.features) updates.features = typeof updates.features === 'string' ? JSON.parse(updates.features) : updates.features;
        if (updates.amenities) updates.amenities = typeof updates.amenities === 'string' ? JSON.parse(updates.amenities) : updates.amenities;
        if (updates.contactInfo) updates.contactInfo = typeof updates.contactInfo === 'string' ? JSON.parse(updates.contactInfo) : updates.contactInfo;

        // Handle uploaded images
        if (req.files && req.files.length > 0) {
            updates.images = req.files.map(file => file.path);
        }

        // Remove fields that should not be updated directly
        if ('createdBy' in updates) delete updates.createdBy;
        if ('status' in updates) delete updates.status;
        if ('isApproved' in updates) delete updates.isApproved;

        const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: 'Property updated.',
            property: updatedProperty,
        });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while updating property.',
            error: err.message,
        });
    }
};




// Delete a property by ID
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid property ID.' });
        }

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found.' });
        }

        // Authorization check
        if (property.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized. You can only delete your own property.' });
        }

        await property.deleteOne();

        res.status(200).json({ success: true, message: 'Property deleted successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while deleting property.', error: err.message });
    }
};



// Get properties of logged-in user
exports.getUserProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
        const skip = (page - 1) * limit;
        const filter = { createdBy: req.user._id };
        const [properties, total, pendingCount, approvedCount] = await Promise.all([
            Property.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Property.countDocuments(filter),
            Property.countDocuments({ createdBy: req.user._id, isApproved: false }),
            Property.countDocuments({ createdBy: req.user._id, isApproved: true })
        ]);
        res.status(200).json({
            success: true,
            properties,
            total,
            pendingCount,
            approvedCount,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get user properties', error: err.message });
    }
};

// Admin: Approve property
exports.approveProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { status: 'approved', isApproved: true, isBanned: false },
            { new: true }
        );
        if (!property) return res.status(404).json({ success: false, message: 'Property not found.' });

        res.status(200).json({ success: true, message: 'Property approved', property });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to approve property', error: err.message });
    }
};

// Admin: Ban property
exports.banProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { status: 'banned', isBanned: true, isApproved: false },
            { new: true }
        );
        if (!property) return res.status(404).json({ success: false, message: 'Property not found.' });

        res.status(200).json({ success: true, message: 'Property banned', property });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to ban property', error: err.message });
    }
};

// Admin: Feature property
exports.featureProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { isFeatured: true, status: 'featured', isApproved: true, isBanned: false },
            { new: true }
        );
        if (!property) return res.status(404).json({ success: false, message: 'Property not found.' });

        res.status(200).json({ success: true, message: 'Property featured', property });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to feature property', error: err.message });
    }
};


// Admin: Get all pending properties for approval
exports.getPendingProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
        const skip = (page - 1) * limit;
        const filter = { status: 'pending', isApproved: false };
        const [properties, total] = await Promise.all([
            Property.find(filter)
                .populate('createdBy', 'username email role')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Property.countDocuments(filter)
        ]);
        res.status(200).json({
            success: true,
            message: 'Pending properties fetched successfully.',
            properties,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error while fetching pending properties.',
            error: err.message
        });
    }
};

// routes/propertyRoutes.js
exports.adminDeleteProperty = async (req, res) => {
    try {
        const deleted = await Property.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete property" });
    }
};

exports.searchPropertiesByPrompt = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }

        // --- Step 1: Spell correction ---
        const keywords = {
            bed: ['bed', 'beds', 'bedroom', 'bedrom', 'bead', 'bad'],
            bath: ['bath', 'baht', 'bathroom', 'batroom', 'baths'],
            kitchen: ['kitchen', 'kichan', 'kitchn', 'kitcen'],
            area: ['area', 'aera', 'arrea', 'arre'],
            location: ['location', 'loc', 'place', 'plce'],
            price: ['price', 'cost', 'budget', 'amount', 'prize']
        };

        const flatKeywords = Object.values(keywords).flat();
        const promptWords = prompt.toLowerCase().split(/\s+/);

        const correctedWords = promptWords.map(word => {
            const match = stringSimilarity.findBestMatch(word, flatKeywords).bestMatch;
            return match.rating > 0.7 ? match.target : word;
        });

        const correctedPrompt = correctedWords.join(' ');

        console.log("Corrected Prompt:", correctedPrompt);

        // --- Step 2: Filter extraction ---
        const filters = {
            area: null,
            location: null,
            price: { min: null, max: null },
            rooms: { beds: null, baths: null, kitchens: null }
        };

        // Area (non-greedy, stops at comma or keyword)
        const areaMatch = correctedPrompt.match(/area\s*[:\-]?\s*([a-z\s]+?)(?:,| under| above| with|$)/i);
        if (areaMatch) filters.area = areaMatch[1].trim();

        // Location (non-greedy, stops at comma or keyword)
        const locationMatch = correctedPrompt.match(/in\s+([a-z\s]+?)(?:,| under| above| with|$)/i);
        if (locationMatch) filters.location = locationMatch[1].trim();

        // Price range (supports crore and lakh)
        const priceRangeMatch = correctedPrompt.match(/(?:rs\.?|₹)?\s?(\d+(?:\s*(?:crore|lakh)?)?)\s*(?:to|upto|-|and)\s*(?:rs\.?|₹)?\s?(\d+(?:\s*(?:crore|lakh)?))/i);
        if (priceRangeMatch) {
            filters.price.min = parsePrice(priceRangeMatch[1]);
            filters.price.max = parsePrice(priceRangeMatch[2]);
        } else {
            // under/below max price
            const priceUnderMatch = correctedPrompt.match(/(?:under|below|max)\s*(?:rs\.?|₹)?\s?(\d+(?:\s*(?:crore|lakh)?))/i);
            if (priceUnderMatch) filters.price.max = parsePrice(priceUnderMatch[1]);

            // above/min price
            const priceMinMatch = correctedPrompt.match(/(?:above|over|min)\s*(?:rs\.?|₹)?\s?(\d+(?:\s*(?:crore|lakh)?))/i);
            if (priceMinMatch) filters.price.min = parsePrice(priceMinMatch[1]);
        }

        // Beds
        const bedMatch = correctedPrompt.match(/(\d+)\s*bed/i);
        if (bedMatch) filters.rooms.beds = parseInt(bedMatch[1]);

        // Baths
        const bathMatch = correctedPrompt.match(/(\d+)\s*bath/i);
        if (bathMatch) filters.rooms.baths = parseInt(bathMatch[1]);

        // Kitchens
        const kitchenMatch = correctedPrompt.match(/(\d+)\s*kitchen/i);
        if (kitchenMatch) filters.rooms.kitchens = parseInt(kitchenMatch[1]);

        console.log("Extracted Filters:", filters);

        // --- Step 3: MongoDB query build ---
        const query = {
            isApproved: true,
            isBanned: false
        };

        if (filters.area) query.area = new RegExp(filters.area, 'i');
        if (filters.location) query['location.address'] = new RegExp(filters.location, 'i');

        if (filters.price.min != null || filters.price.max != null) {
            query.price = {};
            if (filters.price.min != null) query.price.$gte = filters.price.min;
            if (filters.price.max != null) query.price.$lte = filters.price.max;
            if (Object.keys(query.price).length === 0) delete query.price;
        }

        if (filters.rooms.beds != null) query['rooms.beds'] = filters.rooms.beds;
        if (filters.rooms.baths != null) query['rooms.baths'] = filters.rooms.baths;
        if (filters.rooms.kitchens != null) query['rooms.kitchens'] = filters.rooms.kitchens;

        // --- Step 4: If no filters, fallback to full text search ---
        const noFilters = !filters.area &&
            !filters.location &&
            filters.price.min == null &&
            filters.price.max == null &&
            filters.rooms.beds == null &&
            filters.rooms.baths == null &&
            filters.rooms.kitchens == null;

        if (noFilters) {
            query.$text = { $search: prompt };
        }

        // --- Step 5: Search in DB ---
        const properties = await Property.find(query)
            .populate('createdBy', 'username email role');

        res.status(200).json({
            success: true,
            filters,
            count: properties.length,
            properties
        });

    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ success: false, message: 'Server error during search', error: err.message });
    }
};


