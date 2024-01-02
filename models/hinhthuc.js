const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hinhthucSchema = new Schema({
    hinhthuc: { type: String, required: true },
});

const Hinhthuc = mongoose.model('Hinhthuc', hinhthucSchema);

module.exports = Hinhthuc;