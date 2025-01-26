const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const vehicleServiceEstimationSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // email: {
    //     type: String,

    // },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    // fuel: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    odometer: {
      type: Number,
      required: true,
      min: 0,
      // validate: {
      //   validator: function(v) {

      //     return v > this.Odometer;
      //   },
      //   message: props => `The new odometer reading (${props.value}) must be greater than the last recorded reading (${this.lastOdometer})!`,
      // },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // validate: {
      //     validator: function(v) {
      //         return /^\S+@\S+\.\S+$/.test(v);  //  regex email format
      //     },
      //     message: props => `${props.value} is not a valid email!`
      // }
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); //  regex
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    items: [
      {
        itemNumber: {
          type: String,
          required: true,
          trim: true,
        },
        partName: {
          type: String,
          required: true,
          trim: true,
        },
        rate: {
          type: Number,
          require: true,
        },
        // rateNY:{
        //     type :Number,
        //     require:true
        // },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        tax: {
          type: String,
          required: true,
          min: 1,
        },
        mrp: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    vehicleServiceEstimationImages: {
      type: [String],
      default: [],
    },
    capturedImage: {
      type: [String],
      default: [],
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const VehicleServiceEstimation = model(
  "VehicleServiceEstimation",
  vehicleServiceEstimationSchema
);

module.exports = vehicleServiceEstimationSchema;
