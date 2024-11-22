const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        default: 'Image for Nudge',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Image', ImageSchema);