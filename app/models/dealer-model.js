const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dealerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
    vehicleNumber: String,
  },
  { timestamps: true }
);

module.exports = dealerSchema;
