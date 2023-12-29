const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billboardSchema = new Schema({
    billboardID: { type: String, required: true },
    loai: String,
    kichthuoc: String,
    hinhanh: String,
    ngayhethan: Date,
    locationID: { type: String, required: true }
});

const Billboard = mongoose.model('Billboard', billboardSchema);

module.exports = Billboard;