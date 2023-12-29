const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capphepSchema = new Schema({
    licenseID: { type: String, required: true },
    locationID: { type: String, required: true },
    billboardID: { type: String, required: true },
    noidung: String,
    hinhAnh: String,
    congty: String,
    email: String,
    dienthoai: String,
    diachi: String,
    ngaybatdau: Date,
    ngayketthuc: Date,
    tinhtrang: Boolean
});

const Capphep = mongoose.model('Capphep', capphepSchema);

module.exports = Capphep;