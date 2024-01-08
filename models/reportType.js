const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema({
    name: { type: String, required: true },
});

const ReportType = mongoose.model('ReportType', reportTypeSchema);

module.exports = ReportType;