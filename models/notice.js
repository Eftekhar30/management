const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // We store who wrote it so we can display it later
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt dates

module.exports = mongoose.model('Notice', noticeSchema);