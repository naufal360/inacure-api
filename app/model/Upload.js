const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;