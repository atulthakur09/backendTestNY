// const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

// // Ensure you have a password in your environment variables
// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
// const connectionString = `mongodb+srv://mechny1:${password}@devcluster.4gvpd.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`; 



// const client = new MongoClient(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const configureDB = async () => {
//   try {
//     // Connect to the database
//     await client.connect();
//     console.log('Connected to the MongoDB database successfully');

//     // Access the database
//     const db = client.db('vehicle-doctor');

//     // Return the database instance for further use
//     return db;
//   } catch (err) {
//     console.error('Failed to connect to the database:', err);
//     throw err;
//   }
// };

// // CommonJS module loader
// module.exports = configureDB;




//working code
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