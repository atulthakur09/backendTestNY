const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    // partnerId: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to Partner model
    //   ref: 'Partner',
    //   required: true,
    // },
    vehicleNumber: {
      type: String,
      required: [true, "Vehicle number is required"],
      trim: true,
      validate: {
        validator: (value) => /^[A-Z0-9-]{8,15}$/.test(value),
        message: "Vehicle number must be 8-15 alphanumeric characters.",
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value) => !isNaN(Date.parse(value)),
        message: "Invalid date format.",
      },
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      validate: {
        validator: (value) =>
          /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/.test(value),
        message: "Invalid time format. Use HH:MM or HH:MM:SS format.",
      },
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      // minlength: [3, 'Owner name must be at least 3 characters'],
    },
    receiverName: {
      type: String,
      required: [true, "Receiver name is required"],
      trim: true,
      // minlength: [3, 'Receiver name must be at least 3 characters'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, "Comment must be at most 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const VehicleReceived = mongoose.model("VehicleReceived", vehicleSchema);

module.exports = VehicleReceived;
