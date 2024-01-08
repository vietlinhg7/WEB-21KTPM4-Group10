const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loaivitriSchema = new Schema({
    name: { type: String, required: true },
});

const Loaivitri = mongoose.model('Loaivitri', loaivitriSchema);

module.exports = Loaivitri;