const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: { type: String, required: true },
    password: { type: String, required: true },
    chucvu: String,
    hoTen: String,
    nsinh: Date,
    email: String,
    sdt: String,
    phuong: Number,
    quan: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;