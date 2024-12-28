// models/VehicleReceived.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  partnerId: {
    type: String,
    required: true  
},
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    trim: true,
    // minlength: [8, 'Vehicle number must be at least 8 characters'],
    // maxlength: [15, 'Vehicle number must be at most 15 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: (value) => !isNaN(Date.parse(value)),
      message: 'Invalid date format',
    },
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    validate: {
      validator: (value) => {
        // Matches time in HH:MM or HH:MM:SS format
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
        return timeRegex.test(value);
      },
      message: 'Invalid time format. Use HH:MM or HH:MM:SS format.',
    },
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true,
    minlength: [3, 'Owner name must be at least 3 characters'],
  },
  receiverName: {
    type: String,
    required: [true, 'Receiver name is required'],
    trim: true,
    minlength: [3, 'Receiver name must be at least 3 characters'],
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment must be at most 500 characters'],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const VehicleReceived = mongoose.model('VehicleReceived', vehicleSchema);

module.exports = VehicleReceived;
