const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
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
    articleName: {
        type: String,
        required: true,
    },
    predictRate: {
        type: String,
        required: true,
    },	
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const History = mongoose.model("History", historySchema);

module.exports = History;