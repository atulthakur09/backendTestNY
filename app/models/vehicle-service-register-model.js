const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const vehicleServiceRegisterSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'  
    },
    partnerId: {
        type: String,
        required: true  
    },
    workshopName: {
        type: String,
        required: true  
    },
    workshopEmail: {
        type: String,
        required: true  
    },
    workshopAddress: {
        type: String,
        required: true  
    },
    workshopMobile: {
        type: String,
        required: true  
    },
    workshopCity: {
        type: String,
        required: true  
    },
    workshopState: {
        type: String,
        required: true  
    },




    userId: {
        type: String,
        required: true  
    },
    username: {
        type: String,
        // required: true,
        trim: true
    },
    vehicleNumber: {
        type: String,
        // required: true
    },
    chassisNumber: {
        type: String,
        // required: true
    },
    engineNumber: {
        type: String,
        // required: true
    },
    dateOfRCReg:{
        type: String,
        // required: true

    },
    model: {
        type: String,
        // required: true,
        trim: true
    },
    // fuel: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    odometer: {
        type: Number,
        // required: true,
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
        // required: true,
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
        // required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  //  regex 
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    items: [
        {
            itemNumber: {
                type: String,
                required: true,
                trim: true
            },
            partName: {
                type: String,
                required: true,
                trim: true
            },
            rate: {
                type: Number,
                required: true,
                min: 0
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            tax: {
                type: Number,
                required: true,
                min: 0
            },
            mrp: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    vehicleServiceEstimationImages: {
            type: [String], // Array of file paths
            default: []
        },
    capturedImages:{
        type: [String], // Array of file paths
            default: []
    
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    //for customer
    comment: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, //for customer
    //for dealer
    dismantale:{ type: String, default: 'N/A' },  //comment for dism
    dealerDismantlingReq: { type: String, enum: ['N/A', 'Required', 'Not Required'], default: 'Not Required' },
    dismantaleComment: { type: String, default: '' },
    dismantaleStatus: { type: String, enum: ['In Progress', 'Approved', 'Rejected'], default: 'In Progress' },
    // dismantel process page4
    dismantaleApprovalByDealer: { type: String, enum: [ 'Require', 'Not Require'], default: 'Not Require' },
    dismantaleCompleted:{ type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
    additionalDismantalStatus:{ type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    additionalDismantalComment:{ type: String, default: '' },


    partsOrdered:{ type: String, enum: ['N/A', 'Ordered', 'In Transit',"Order Recieved"], default: 'N/A' },
    workInProgress:{ type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
    preInvoice:{ type: String, enum: ['Invoice Generated', 'N/A'], default: 'N/A' },
      





  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const VehicleService = model('VehicleService', vehicleServiceRegisterSchema);

module.exports = VehicleService;

