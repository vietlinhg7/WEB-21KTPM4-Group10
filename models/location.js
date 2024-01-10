const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationID: { type: String, required: true },
    name: String,
    diachi: String,
    phuongID: String,
    quanID: String,
    loaivitri: String,
    hinhanh: String,
    hinhthuc: String,
    quyhoach: String,
    toadoX: Number,
    toadoY: Number
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;