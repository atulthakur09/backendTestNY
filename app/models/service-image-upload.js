const mongoose = require('mongoose');

const serviceImageUploadSchema = new mongoose.Schema({
serviceImages: {
    type: [String], // Array of file paths
    default: []
  },
})

const ServiceImageUpload = mongoose.model('ServiceImageUpload', serviceImageUploadSchema);

module.exports = ServiceImageUpload;