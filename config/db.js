const mongoose = require('mongoose')
const configureDB = async () => { 
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/vehicle-doctor')
        console.log('Connected To Database Successfully')
    }  catch(err) {
        console.log(err)
    }
   
    
}

// common js module loader 
module.exports = configureDB