const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportTypeSchema = new Schema({
    reportType: { type: String, required: true },
});

const ReportType = mongoose.model('reportType', reportTypeSchema);

module.exports = ReportType;