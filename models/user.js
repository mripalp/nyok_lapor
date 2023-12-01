// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
