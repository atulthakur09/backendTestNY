const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const appointmentBookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: String,
        required: true  
    },
    dealerId: {
        type: String,
        required: true  
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: Number,
        required: true,
        match: /^[0-9]{10}$/, 
    },
    email: {
        type: String,
        required: true,  
        trim: true      
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Ensure comparison is done only by date, not time
                return value >= today;
            },
            message: 'Date cannot be in the past'
        }
    },
    timeSlot: {
        type: String,
        required: true,
        enum: [
            "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM",
            "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"
        ],
    },
    vehicleNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Z0-9\s-]+$/i // Alphanumeric with spaces and hyphens allowed
    },
    serviceType: {
        type: String,
        required: true,
        enum: [
            "Ac Service & Repair", "Batteries", "Car Spa & Cleaning", "Clutch & Body Parts",
            "Denting & Paint", "Detailing Service", "General Service", "Major Service",
            "Oil Change", "Periodic Service", "Suspension & Fitment", "Tyre & Wheel",
            "Windshield & Lights"
        ],
    },
    pickupAndDrop: {
        type: Boolean,
        default: false, 
        required: true,  
        // trim: true      
    },
    pickupAddress: {
        type: String,
        required: false,  
        trim: true      
    },
    dropAddress: {
        type: String,
        required: false,  
        trim: true      
    },
    billingAddress: {
        type: String,
        required: false,  
        trim: true      
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AppointmentBooking = model('AppointmentBooking', appointmentBookingSchema);

module.exports = AppointmentBooking;


// const mongoose = require('mongoose');
// const { odometer } = require('../validations/vehicle-register-validations');
// const { Schema, model } = mongoose;


// const appointmentBookingSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     contact: {
//         type: Number,
//         required: true,
//         trim: true,
//         match: /^[0-9]{10}$/, 
//     },
//     date: {
//         type: Date,
//         required: true,
//     },
//     timeSlot: {
//         type: String,
//         required: true,
//         enum: [
//             "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM",
//             "02:00 PM - 03:00 PM", "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM", "05:00 PM - 06:00 PM"
//         ],
//     },
//     vehicleNumber: {
//         type: String,
//         required: true,
//         trim: true,
//         match: /^[A-Z0-9\s-]+$/i // Alphanumeric with spaces and hyphens allowed
//     },
    
//     serviceType: {
//         type: String,
//         required: true,
//         enum: [
//             "Ac Service & Repair", "Batteries", "Car Spa & Cleaning", "Clutch & Body Parts",
//             "Denting & Paint", "Detailing Service", "General Service", "Major Service",
//             "Oil Change", "Periodic Service", "Suspension & Fitment", "Tyre & Wheel",
//             "Windshield & Lights"
//         ],
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });


// const AppointmentBooking = model('AppointmentBooking', appointmentBookingSchema);

// module.exports = AppointmentBooking;
