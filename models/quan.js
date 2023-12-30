const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quanSchema = new Schema({
    quanID: { type: String, required: true },
});

const Quan = mongoose.model('Quan', quanSchema);

module.exports = Quan;