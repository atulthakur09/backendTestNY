const b2bFleetInfoValidationSchema = {
    businessName: {
        in: ['body'], // Specify location explicitly
        exists: {
            errorMessage: 'Business name is required',
        },
        notEmpty: {
            errorMessage: 'Business name cannot be empty',
        },
        trim: true,
        isString: {
            errorMessage: 'Business name must be a string',
        },
        escape: true,
    },
    contact: {
        in: ['body'],
        exists: {
            errorMessage: 'Contact number is required',
        },
        notEmpty: {
            errorMessage: 'Contact number cannot be empty',
        },
        trim: true,
        isNumeric: {
            errorMessage: 'Contact number must contain only numbers',
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Contact number must be 10 digits long',
        },
        matches: {
            options: /^[0-9]{10}$/,
            errorMessage: 'Contact number must be a valid 10-digit number',
        },
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'Email is required',
        },
        notEmpty: {
            errorMessage: 'Email cannot be blank',
        },
        isEmail: {
            errorMessage: 'Invalid email format',
        },
        normalizeEmail: true,
        trim: true,
    },
    billingAddress: {
        in: ['body'],
        exists: {
            errorMessage: 'Billing address is required',
        },
        notEmpty: {
            errorMessage: 'Billing address cannot be empty',
        },
        trim: true,
    },
    gstin: {
        in: ['body'],
        exists: {
            errorMessage: 'GSTIN is required',
        },
        notEmpty: {
            errorMessage: 'GSTIN cannot be empty',
        },
        trim: true,
        isString: {
            errorMessage: 'GSTIN must be a string',
        },
        matches: {
            options: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
            errorMessage: 'Invalid GSTIN format',
        },
    },
};

module.exports = b2bFleetInfoValidationSchema;

// const b2bFleetInfoSchema = {
//     businessName: {
//         in: ['body'], // Specify location explicitly
//         exists: {
//             errorMessage: 'Business name is required'
//         },
//         notEmpty: {
//             errorMessage: 'Business name cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Business name must be a string'
//         },
//         escape: true
//     },
//     contact: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'Contact number is required'
//         },
//         notEmpty: {
//             errorMessage: 'Contact number cannot be empty'
//         },
//         trim: true,
//         isNumeric: {
//             errorMessage: 'Contact number must contain only numbers'
//         },
//         isLength: {
//             options: { min: 10, max: 10 },
//             errorMessage: 'Contact number must be 10 digits long'
//         },
//         matches: {
//             options: /^[0-9]{10}$/,
//             errorMessage: 'Contact number must be a valid 10-digit number'
//         }
//     },
//     email: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'Email is required'
//         },
//         notEmpty: {
//             errorMessage: 'Email cannot be blank'
//         },
//         isEmail: {
//             errorMessage: 'Invalid email format'
//         },
//         normalizeEmail: true,
//         trim: true
//     },
//     billingAddress: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'Address is required'
//         },
//         notEmpty: {
//             errorMessage: 'Address cannot be empty'
//         },
//         trim: true
//     },
//     gstin: {
//         in: ['body'],
//         exists: {
//             errorMessage: 'GSTIN is required'
//         },
//         notEmpty: {
//             errorMessage: 'GSTIN cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'GSTIN must be a string'
//         },
//         matches: {
//             options: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
//             errorMessage: 'Invalid GSTIN format'
//         }
//     }
// };

// module.exports = b2bFleetInfoSchema;

// // const b2bFleetInfoSchema = {
// //     businessName: {
// //         exists: {
// //             errorMessage: 'Business name is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'BUsiness name cannot be empty'
// //         },
// //         trim: true,
// //         isString: {
// //             errorMessage: 'Business name must be a string'
// //         },
// //         escape: true
// //     },
// //     contact: {
// //         exists: {
// //             errorMessage: 'Contact number is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'Contact number cannot be empty'
// //         },
// //         trim: true,
// //         isNumeric: {
// //             errorMessage: 'Contact number must contain only numbers'
// //         },
// //         isLength: {
// //             options: { min: 10, max: 10 },
// //             errorMessage: 'Contact number must be 10 digits long'
// //         },
// //         matches: {
// //             options: /^[0-9]{10}$/,
// //             errorMessage: 'Contact number must be a valid 10-digit number'
// //         }
// //     },
// //     email: {
// //         exists: {
// //             errorMessage: 'email is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'email cannot be blank'
// //         },
// //         isEmail: {
// //             errorMessage: 'invalid email format'
// //         },
// //         normalizeEmail: true,
// //         trim: true 
// //     },
// //     address: {
// //         in: ['body'],
// //         exists: {
// //             errorMessage: 'address is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'address cannot be empty'
// //         },
// //         trim: true 
// //     },
// //     gstin: {
// //         exists: {
// //             errorMessage: 'GSTIN is required'
// //         },
// //         notEmpty: {
// //             errorMessage: 'GSTIN cannot be empty'
// //         },
// //         trim: true,
// //         isString: {
// //             errorMessage: 'GSTIN must be a string'
// //         },
// //         // escape: true
// //     },
// // }

// // module.exports = b2bFleetInfoSchema;