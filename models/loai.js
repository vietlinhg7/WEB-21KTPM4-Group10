const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loaiSchema = new Schema({
    loai: { type: String, required: true },
});

const Loai = mongoose.model('Loai', loaiSchema);

module.exports = Loai;