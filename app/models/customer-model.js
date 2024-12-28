const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
    vehicleNumber: String
}, { timestamps: true })

const Customer = model('Customer', customerSchema)

module.exports = Customer 