const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capphepSchema = new Schema({
    licenseID: String,
    locationID: String,
    billboardID: String,
    noidung: String,
    hinhAnh: String,
    congty: String,
    email: String,
    dienthoai: String,
    diachi: String,
    ngaybatdau: Date,
    ngayketthuc: Date,
    tinhtrang: String
});

const Capphep = mongoose.model('Capphep', capphepSchema);

module.exports = Capphep;