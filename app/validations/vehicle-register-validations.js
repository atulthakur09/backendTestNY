const Vehicle = require("../models/vehicle-register-model");
// const vehicleService = require("../models/vehicle-service-register-model")

const vehicleRegisterValidationSchema = {
  username: {
    exists: {
      errorMessage: "Username is required",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    trim: true,
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  vehicleNumber: {
    exists: {
      errorMessage: "Vehicle registration number is required",
    },
    notEmpty: {
      errorMessage: "Vehicle registration number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Vehicle registration number should be alphanumeric",
    },
    trim: true,
  },
  vehicleColor: {
    exists: {
      errorMessage: "Vehicle color is required",
    },
    notEmpty: {
      errorMessage: "Vehicle color cannot be empty",
    },
    trim: true,
  },
  odometer: {
    exists: {
      errorMessage: "Odometer reading is required",
    },
    notEmpty: {
      errorMessage: "Odometer reading cannot be empty",
    },
    isNumeric: {
      errorMessage: "Odometer reading should be a numeric value",
    },
    toFloat: true,
    trim: true,
  },
  mobile: {
    exists: {
      errorMessage: "Mobile number is required",
    },
    notEmpty: {
      errorMessage: "Mobile number cannot be empty",
    },
    isNumeric: {
      errorMessage: "Mobile number should be a numeric value",
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: "Mobile number should be 10 digits long",
    },
    custom: {
      options: async (value) => {
        const vehicle = await Vehicle.findOne({ contact: value });
        if (vehicle) {
          throw new Error("Mobile number already exists");
        }
        return true;
      },
    },
    trim: true,
  },
  email: {
    exists: {
      errorMessage: "Email is required",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Email should be in a valid format",
    },
    trim: true,
    normalizeEmail: true,
  },
  brand: {
    exists: {
      errorMessage: "Vehicle brand is required",
    },
    notEmpty: {
      errorMessage: "Vehicle brand cannot be empty",
    },
    trim: true,
    isString: {
      errorMessage: "Vehicle brand must be a string",
    },
  },
  model: {
    exists: {
      errorMessage: "Vehicle model is required",
    },
    notEmpty: {
      errorMessage: "Vehicle model cannot be empty",
    },
    trim: true,
    isString: {
      errorMessage: "Vehicle model must be a string",
    },
  },
  fuel: {
    exists: {
      errorMessage: "Fuel type is required",
    },
    notEmpty: {
      errorMessage: "Fuel type cannot be empty",
    },
    trim: true,
    isString: {
      errorMessage: "Fuel type must be a string",
    },
  },

  //extra addition
  engineNumber: {
    exists: {
      errorMessage: "Vehicle engine number is required",
    },
    notEmpty: {
      errorMessage: "Vehicle engine number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Vehicle engine number should be alphanumeric",
    },
    trim: true,
  },
  chassisNumber: {
    exists: {
      errorMessage: "Vehicle chassis number is required",
    },
    notEmpty: {
      errorMessage: "Vehicle chassis number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Vehicle chassis number should be alphanumeric",
    },
    trim: true,
  },
  // Validation for date
  dateOfRCReg: {
    exists: { errorMessage: "Date is required" },
    notEmpty: {
      errorMessage: "Date cannot be empty",
    },
  },
};

module.exports = vehicleRegisterValidationSchema;
