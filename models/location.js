const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    locationID: { type: String, required: true },
    diachi: String,
    phuong: String,
    quan: String,
    loaivitri: String,
    hinhthuc: String,
    hinhanh: String,
    quyhoach: String,
    taodoX: Number,
    toadoY: Number
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;