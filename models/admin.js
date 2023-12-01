// models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
