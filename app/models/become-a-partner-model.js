const mongoose = require("mongoose");

// Define the schema for the Dealer model
const dealerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  workshopName: {
    type: String,
    required: true,
    trim: true,
  },

  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: Number,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String, // Changed from Number to String for mobile numbers
    required: true,
    unique: true,
    trim: true,
  },
  liveLocation: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  shopImages: {
    type: [String], // Array of file paths
    default: [],
  },
  gstImages: {
    type: [String], // Array of file paths
    default: [],
  },
  panCard: {
    type: [String], // Single file path
    default: null,
  },
  aadhaarCard: {
    type: [String], // Single file path
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Dealer model
const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
