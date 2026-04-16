const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  javascript: String,
  python: String,
  java: String,
  cpp: String
}, { _id: false });

const DriverTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  languages: LanguageSchema,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DriverTemplate', DriverTemplateSchema);