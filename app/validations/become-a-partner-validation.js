const { body } = require("express-validator");

const validateBecomeAPartner = [
  body("workshopName")
    .notEmpty()
    .withMessage("Workshop name is required.")
    .isString()
    .withMessage("Workshop name must be a string.")
    .trim(),

  body("ownerName")
    .notEmpty()
    .withMessage("Owner name is required.")
    .isString()
    .withMessage("Owner name must be a string.")
    .trim(),

  body("state")
    .notEmpty()
    .withMessage("State is required.")
    .isString()
    .withMessage("State must be a string.")
    .trim(),

  body("city")
    .notEmpty()
    .withMessage("City is required.")
    .isString()
    .withMessage("City must be a string.")
    .trim(),

  body("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isString()
    .withMessage("Address must be a string.")
    .trim(),

  body("pinCode")
    .notEmpty()
    .withMessage("Pin code number is required.")
    .isMobilePhone()
    .withMessage("Invalid pin code number.")
    .trim(),

  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required.")
    .isMobilePhone()
    .withMessage("Invalid mobile number.")
    .trim(),

  body("liveLocation")
    .notEmpty()
    .withMessage("Live location is required.")
    .isJSON()
    .withMessage("Live location must be in JSON format."),

  // Validate the file uploads (shopImages, panCard, aadhaarCard) can be handled directly in multer middleware, if needed.
];

module.exports = { validateBecomeAPartner };

// const { body, check } = require('express-validator');

// // Validation rules for dealer registration
// const validateBecomeAPartner = [
//   body('workshopName')
//     .notEmpty()
//     .withMessage('Workshop name is required')
//     .isString()
//     .withMessage('Workshop name must be a string')
//     .trim(),

//   body('ownerName')
//     .notEmpty()
//     .withMessage('Owner name is required')
//     .isString()
//     .withMessage('Owner name must be a string')
//     .trim(),

//   body('city')
//     .notEmpty()
//     .withMessage('City is required')
//     .isString()
//     .withMessage('City must be a string')
//     .trim(),

//   body('location')
//     .notEmpty()
//     .withMessage('Location is required')
//     .isString()
//     .withMessage('Location must be a string')
//     .trim(),

//   body('mobileNumber')
//     .notEmpty()
//     .withMessage('Mobile number is required')
//     .matches(/^\d{10}$/)
//     .withMessage('Please provide a valid 10-digit mobile number'),

//   check('shopImages')
//     .custom((value, { req }) => {
//       if (!req.files || !req.files.shopImages || req.files.shopImages.length === 0) {
//         throw new Error('At least one shop image is required');
//       }
//       return true;
//     }),

//   check('panCard')
//     .custom((value, { req }) => {
//       if (!req.files || !req.files.panCard || req.files.panCard.length === 0) {
//         throw new Error('PAN card image is required');
//       }
//       return true;
//     }),

//   check('adharCard')
//     .custom((value, { req }) => {
//       if (!req.files || !req.files.adharCard || req.files.adharCard.length === 0) {
//         throw new Error('Aadhaar card image is required');
//       }
//       return true;
//     }),

//   body('liveLocation')
//     .notEmpty()
//     .withMessage('Live location is required')
//     .isObject()
//     .withMessage('Live location must be an object containing lat and lng'),

//   body('liveLocation.lat')
//     .notEmpty()
//     .withMessage('Latitude is required')
//     .isFloat({ min: -90, max: 90 })
//     .withMessage('Latitude must be a number between -90 and 90'),

//   body('liveLocation.lng')
//     .notEmpty()
//     .withMessage('Longitude is required')
//     .isFloat({ min: -180, max: 180 })
//     .withMessage('Longitude must be a number between -180 and 180'),
// ];

// module.exports = { validateBecomeAPartner };
