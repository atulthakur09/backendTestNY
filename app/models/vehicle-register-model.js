const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const vehicleRegisterSchema = new Schema({
   
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: String,
        required: true  
    },
    username: {
        type: String,
        required: true,  
        trim: true      
    },
    vehicleNumber: {
        type: String,
        required: true,  
           
        trim: true       
    },
    vehicleColor: {
        type: String,
        required: true,  
        trim: true       
    },
    brand: {
        type: String,
        required: true,  
        trim: true       
    },
    model: {
        type: String,
        required: true,  
        trim: true       
    },
    fuel: {
        type: String,
        required: true,  
        trim: true       
    },

    chassisNumber: {
        type: String,
        required: true,  
        trim: true       
    },

    engineNumber: {
        type: String,
        required: true,  
           
        trim: true       
    },


    odometer: {
        type: Number,
        required: true,  
        min: 0          
    },
    email: {
        type: String,
        required: true,  
        trim: true      
    },
    mobile: {
        type: Number,
        required: true,  
        trim: true,      
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Simple regex to ensure it's a 10-digit number
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    address: {
        type: String,
        required: true,  
        trim: true       
    },
    dateOfRCReg: {
        type: Date,
        required: true,
        validate: {
          validator: function (v) {
            // Ensure the date is not in the future
            return v <= new Date();
          },
          message: 'Date cannot be in the future',
        },
      },
}, { timestamps: true });  


const VehicleRegister = model('VehicleRegister', vehicleRegisterSchema);

module.exports = VehicleRegister;


