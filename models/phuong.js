const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phuongSchema = new Schema({
    phuongID: { type: String, required: true },
    quanID: { type: String, required: true }
});

const Phuong = mongoose.model('Phuong', phuongSchema);

module.exports = Phuong;