const { checkSchema } = require("express-validator");
const vehicleService = require("../models/vehicle-service-register-model");
const {
  chassisNumber,
  dateOfRCReg,
} = require("./vehicle-register-validations");

const vehicleServiceValidationSchema = checkSchema({
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
  email: {
    exists: {
      errorMessage: "email is required",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
    isEmail: {
      errorMessage: "email should be a valid format",
    },

    trim: true,
    normalizeEmail: true,
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

  odometer: {
    exists: {
      errorMessage: "Odometer number is required",
    },
    notEmpty: {
      errorMessage: "Odometer number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Odometer number should be numeric value",
    },
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
    trim: true,
  },
  //newwwwww
  address: {
    exists: {
      errorMessage: "Address is required",
    },
    notEmpty: {
      errorMessage: "ADdress cannot be empty",
    },
    trim: true,
  },
  chassisNumber: {
    exists: {
      errorMessage: "Chassis number is required",
    },
    notEmpty: {
      errorMessage: "Chassis number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Chassis number should be alphanumeric",
    },
    trim: true,
  },
  engineNumber: {
    exists: {
      errorMessage: "Engine number is required",
    },
    notEmpty: {
      errorMessage: "Engine number cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Engine number should be alphanumeric",
    },
    trim: true,
  },
  dateOfRCReg: {
    exists: {
      errorMessage: "Date of registration on RC is required",
    },
    notEmpty: {
      errorMessage: "Date of registration on RC cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Date of registration on RC should be alphanumeric",
    },
    trim: true,
  },
  //newwwww end
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
  items: {
    isArray: {
      errorMessage: "Items must be an array",
    },
    custom: {
      options: (items) => {
        if (!items.length) {
          throw new Error("At least one item must be included");
        }
        return true;
      },
    },
  },
  "items.*.itemNumber": {
    exists: {
      errorMessage: "Item number is required",
    },
    notEmpty: {
      errorMessage: "Item number cannot be empty",
    },
    trim: true,
  },
  "items.*.partName": {
    exists: {
      errorMessage: "Part name is required",
    },
    notEmpty: {
      errorMessage: "Part name cannot be empty",
    },
    trim: true,
  },
  // new
  "items.*.rate": {
    exists: {
      errorMessage: "Rate is required",
    },
    notEmpty: {
      errorMessage: "Rate cannot be empty",
    },
    isNumeric: {
      errorMessage: "Rate should be a numeric value",
    },
    toInt: true,
  },
  // 'items.*.rateNY': {
  //     exists: {
  //         errorMessage: 'Rate is required'
  //     },
  //     notEmpty: {
  //         errorMessage: 'Rate cannot be empty'
  //     },
  //     isNumeric: {
  //         errorMessage: 'Rate should be a numeric value'
  //     },
  //     toInt: true
  // },

  "items.*.quantity": {
    exists: {
      errorMessage: "Quantity is required",
    },
    notEmpty: {
      errorMessage: "Quantity cannot be empty",
    },
    isNumeric: {
      errorMessage: "Quantity should be a numeric value",
    },
    toInt: true,
  },
  "items.*.tax": {
    exists: {
      errorMessage: "Tax is required",
    },
    notEmpty: {
      errorMessage: "Tax cannot be empty",
    },
    isFloat: {
      errorMessage: "Tax should be a numeric value",
    },
    toFloat: true,
  },
  "items.*.mrp": {
    exists: {
      errorMessage: "MRP is required",
    },
    notEmpty: {
      errorMessage: "MRP cannot be empty",
    },
    isFloat: {
      errorMessage: "MRP should be a numeric value",
    },
    toFloat: true,
  },

  totalAmount: {
    exists: {
      errorMessage: "Total amount is required",
    },
    notEmpty: {
      errorMessage: "Total amount cannot be empty",
    },
    isFloat: {
      errorMessage: "Total amount should be a numeric value",
    },
    toFloat: true,
  },
});

module.exports = vehicleServiceValidationSchema;
