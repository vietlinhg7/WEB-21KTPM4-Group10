const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    requestID: { type: String, required: true },
    thongtinmoi: Schema.Types.Mixed,
    thoidiem: { type: Date, default: Date.now },
    lydo: String,
    queryID: { type: String, required: true },
    tinhtrang: String,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;