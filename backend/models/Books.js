const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    genre: { type: String },
    copiesAvailable: { type: Number, default: 1 },
    totalCopies: { type: Number, required: true },
    publishedDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
