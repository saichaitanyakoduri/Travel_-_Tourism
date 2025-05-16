const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId }, // Ensure _id is an ObjectId
  name: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);
