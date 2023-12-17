const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    deskripsi: { type: String, required: true },
    tanggalkejadian: { type: Date, required: true },
    image: { type: String, required: true },
    longititude: { type: String, required: true},
    latitude: { type: String, required: true},
    status: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the report
});

//reportSchema.index({ lokasi: '2dsphere' });

const Laporan = mongoose.model('Laporan', reportSchema);

module.exports = Laporan;




