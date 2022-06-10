const mongoose = require('mongoose');

const userImagesSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const UserImages = mongoose.model("UserImages", userImagesSchema);

module.exports = UserImages;