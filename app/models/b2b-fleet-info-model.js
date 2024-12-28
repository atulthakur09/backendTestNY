const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const b2bFleetInfoSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    businessName: {
        type: String,
        required: true,
        trim: true,
    },
    gstin: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
    },
    billingAddress: {
        type: String,
        trim: true, // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const B2bFleetInfo = model('B2bFleetInfo', b2bFleetInfoSchema);
module.exports = B2bFleetInfo;

// const mongoose = require('mongoose');
// const { Schema, model } = mongoose;
// const b2bFleetInfoSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     contact: {
//         type: String,
//         required: true,
//         match: /^[0-9]{10}$/,
//     },
//     businessName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
    
//     gstin: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
//     },
//     billingAddress: {
//         type: String,
//         trim: true, // Optional, can be required if needed
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const B2bFleetInfo = model('B2bFleetInfo', b2bFleetInfoSchema);

// module.exports = B2bFleetInfo;

// // const mongoose = require('mongoose');
// // const { Schema, model } = mongoose;

// // const b2bFleetInfoSchema = new Schema({
// //     contact: {
// //         type: Number,
// //         required: true,
// //         match: /^[0-9]{10}$/, // Ensures a valid 10-digit contact number
// //     },
// //     email: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //         match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
// //     },
// //     gstin: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //         match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, // Valid GSTIN format
// //     },
// //     address: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //     },
// //     businessName: {
// //         type: String,
// //         required: true,
// //         trim: true,
// //     },
// // });

// // const B2bFleetInfo = model('B2bFleetInfo', b2bFleetInfoSchema);

// // module.exports = B2bFleetInfo;

// // // const mongoose = require('mongoose');
// // // const { Schema, model } = mongoose;

// // // const b2bFleetInfo = new Schema({
// // //     contact: {
// // //         type: Number,
// // //         required: true,
// // //         match: /^[0-9]{10}$/, 
// // //     },
// // //     email: {
// // //         type: String,
// // //         required: true,  
// // //         trim: true      
// // //     },
// // //     gstin: {
// // //         type: String,
// // //         required: true,
// // //         trim: true,
// // //         match: !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/
// // //     },
// // //     address: {
// // //         type: String,
// // //         required: true,  
// // //         trim: true      
// // //     },
// // //     businessName: {
// // //         type: String,
// // //         required: true,  
// // //         trim: true      
// // //     },
// // // })

// // // const B2bFleetInfo = model('B2bFleetInfo', b2bFleetInfoSchema);
// // // module.exports = B2bFleetInfo;