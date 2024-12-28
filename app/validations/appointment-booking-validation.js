
const Vehicle = require('../models/vehicle-register-model');

const appointmentBookingValidationSchema = {
    name: {
        exists: {
            errorMessage: 'Name is required'
        },
        notEmpty: {
            errorMessage: 'Name cannot be empty'
        },
        trim: true,
        isString: {
            errorMessage: 'Name must be a string'
        },
        escape: true
    },
    contact: {
        exists: {
            errorMessage: 'Contact number is required'
        },
        notEmpty: {
            errorMessage: 'Contact number cannot be empty'
        },
        trim: true,
        isNumeric: {
            errorMessage: 'Contact number must contain only numbers'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Contact number must be 10 digits long'
        },
        matches: {
            options: /^[0-9]{10}$/,
            errorMessage: 'Contact number must be a valid 10-digit number'
        }
    },
    email: {
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        },
        normalizeEmail: true,
        trim: true 
    },
    date: {
        exists: {
            errorMessage: 'Date is required'
        },
        notEmpty: {
            errorMessage: 'Date cannot be empty'
        },
        isISO8601: {
            errorMessage: 'Date must be a valid ISO8601 date'
        },
        custom: {
            options: (value) => {
                const today = new Date().setHours(0, 0, 0, 0);
                const selectedDate = new Date(value).setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            errorMessage: 'Date cannot be in the past'
        }
    },
    timeSlot: {
        exists: {
            errorMessage: 'Time slot is required'
        },
        notEmpty: {
            errorMessage: 'Time slot cannot be empty'
        },
        trim: true,
        isString: {
            errorMessage: 'Time slot must be a string'
        },
        escape: true
    },
    vehicleNumber: {
        exists: {
            errorMessage: 'Vehicle number is required'
        },
        notEmpty: {
            errorMessage: 'Vehicle number cannot be empty'
        },
        trim: true,
        isString: {
            errorMessage: 'Vehicle number must be a string'
        },
        matches: {
            options: /^[A-Z0-9- ]+$/,
            errorMessage: 'Vehicle number must be alphanumeric and can contain hyphens'
        },
        escape: true
    },
    serviceType: {
        exists: {
            errorMessage: 'Service type is required'
        },
        notEmpty: {
            errorMessage: 'Service type cannot be empty'
        },
        trim: true,
        isString: {
            errorMessage: 'Service type must be a string'
        },
        escape: true
    },
    pickupAndDrop: {
        type: Boolean,
        
        required: [true, 'Pickup and Drop is required'], // Custom error message for required validation
      },
      
    pickupAddress: {
        in: ['body'],
        exists: {
            errorMessage: 'Pickup address is required',
        },
        notEmpty: {
            errorMessage: 'Pickup address cannot be empty',
        },
        trim: true,
    },
    dropAddress: {
        in: ['body'],
        exists: {
            errorMessage: 'Drop address is required',
        },
        notEmpty: {
            errorMessage: 'Drop address cannot be empty',
        },
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
};

module.exports = appointmentBookingValidationSchema;

// const Vehicle = require('../models/vehicle-register-model');

// const appointmentBookingValidationSchema = {
//     name: {
//         exists: {
//             errorMessage: 'Name is required'
//         },
//         notEmpty: {
//             errorMessage: 'Name cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Name must be a string'
//         }
//     },
//     contact: {
//         exists: {
//             errorMessage: 'Contact number is required'
//         },
//         notEmpty: {
//             errorMessage: 'Contact number cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Contact number must be a string'
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
//     date: {
//         exists: {
//             errorMessage: 'Date is required'
//         },
//         notEmpty: {
//             errorMessage: 'Date cannot be empty'
//         },
//         isISO8601: {
//             errorMessage: 'Date must be a valid date'
//         }
//     },
//     timeSlot: {
//         exists: {
//             errorMessage: 'Time slot is required'
//         },
//         notEmpty: {
//             errorMessage: 'Time slot cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Time slot must be a string'
//         }
//     },
//     vehicleNumber: {
//         exists: {
//             errorMessage: 'Vehicle number is required'
//         },
//         notEmpty: {
//             errorMessage: 'Vehicle number cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Vehicle number must be a string'
//         },
//         matches: {
//             options: /^[A-Z0-9- ]+$/,
//             errorMessage: 'Vehicle number must be alphanumeric and can contain hyphens'
//         }
//     },
//     serviceType: {
//         exists: {
//             errorMessage: 'Service type is required'
//         },
//         notEmpty: {
//             errorMessage: 'Service type cannot be empty'
//         },
//         trim: true,
//         isString: {
//             errorMessage: 'Service type must be a string'
//         }
//     }
// };

// module.exports = appointmentBookingValidationSchema;
