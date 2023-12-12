// models/report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    // Anda dapat menambahkan bidang lain sesuai kebutuhan aplikasi Anda
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
