const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    address: { type: String },
    memberSince: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);
