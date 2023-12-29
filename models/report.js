const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportID: { type: String, required: true },
    hinhthuc: String,
    hoten: String,
    email: String,
    sdt: String,
    noidung: String,
    thoidiemgui: Date,
    tinhtrang: String,
    cachthucxuly: String,
    queryID: { type: String, required: true },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;