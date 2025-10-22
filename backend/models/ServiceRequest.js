const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  additionalDetails: {
    type: String
  },
  shareWithProviders: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['new', 'reviewing', 'contacted', 'completed'],
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);