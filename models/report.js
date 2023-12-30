const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  reportType: String,
  fullName: String,
  email: String,
  phone: String,
  reportContent: String,
  thoidiemgui: Date,
  tinhtrang: String,
  cachthucxuly: String,
  // image1: Buffer, // Sử dụng kiểu dữ liệu Buffer cho ảnh
  // image2: Buffer // Sử dụng kiểu dữ liệu Buffer cho ảnh
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;