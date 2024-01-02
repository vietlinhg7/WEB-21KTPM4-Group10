const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hinhthucSchema = new Schema({
    hinhthucID: { type: String, required: true },
    hinhthuc: String,
});

const Hinhthuc = mongoose.model('Hinhthuc', hinhthucSchema);

module.exports = Hinhthuc;