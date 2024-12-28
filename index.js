// npm init -y  
// npm install express 
// server start -----> npm start


const multer = require('multer');
const fs = require('fs')
const path = require('node:path')


// const upload = require('./app/middlewares/multer');

require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { checkSchema } = require('express-validator');
const configureDB = require('./config/db');
const userRegisterValidationSchema = require('./app/validations/user-register-validations');
const userLoginValidationSchema = require('./app/validations/user-login-validation');
const vehicleRegisterValidationSchema = require('./app/validations/vehicle-register-validations')
const vehicleServiceValidationSchema = require('./app/validations/vehicle-service-register-validations')
const { customerValidationSchema, customerEditValidationSchema } = require('./app/validations/customer-validation');
const usersCltr = require('./app/controllers/users-cltr');
const vehiclesCltr = require('./app/controllers/vehicles-cltr');
const dealersCltr = require ('./app/controllers/dealers-cltr')
const serviceManagementCltr = require('./app/controllers/service-management-cltr')

const authenticateUser = require('./app/middlewares/authenticateUser');
const authorizeUser = require('./app/middlewares/authorizeUser');


const appointmentCltr = require('./app/controllers/vehicles-cltr');
const appointmentBooking = require('./app/validations/appointment-booking-validation')

//file uploads
const upload =  multer({
  dest: path.resolve(__dirname,"./uploads"),
  limits:{fileSize:3e7 }   // 30mb ->  30*1024*1024  for 30mb

})


//partner form
// const becomeAPartner = require("./app/controllers/dealers-cltr")



//vehicle service hardcoded price
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vehicleServicesPrices = require('./app/controllers/vehicles-cltr');





 



const app = express();
const port = process.env.PORT ;

configureDB();
app.use(cors())

// Middleware to parse JSON
app.use(express.json());

// Application level middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`);
  next();
});

// User routes
//registration
app.post('/users/register', checkSchema(userRegisterValidationSchema), usersCltr.register);
//login
app.post('/users/login', checkSchema(userLoginValidationSchema), usersCltr.login);
//account information
app.get('/users/account', authenticateUser, usersCltr.account);


// vehicle 
//add new vehicle for customer
app.post('/users/addVehicle', checkSchema(vehicleRegisterValidationSchema), vehiclesCltr.register);
//get registered vehicle for vehicle owner
app.get('/vehicles/:userId', vehiclesCltr.myVehicles);
//admin get vehicle information
app.get('/admin/vehicles/:vehicleNumber' , vehiclesCltr.getVehicleByNumber)



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




// adding new service details of selected user 
app.post(
  "/service/register",
  upload.fields([
      { name: "vehicleServiceEstimationImages", maxCount: 10 },
      { name: "capturedImages", maxCount: 10 }
  ]),
  vehiclesCltr.vehicleServiceRegister
);



// test
// app.post(
//   "/service/register",
//   upload.fields([
//       { name: "vehicleServiceEstimationImages", maxCount: 50 },
//       { name: "capturedImages", maxCount: 50 }
//   ]),
//   dealersCltr.vehicleServiceRegister
// );

//user vehicle service history
app.get('/service/register/:vehicleNumber',vehiclesCltr.vehicleServiceList)

//user appointment history
app.get('/AppointmentsList/:userId', vehiclesCltr.myAppointmentsList)

//dealer service history for all vehicles
app.get("/dealer/service/register/:vehicleNumber",dealersCltr.vehicleServiceHistory)



//become a partner register
app.post(
  "/becomeAPartner/dealerRegister",
  upload.fields([
    // { name: "coverImage", maxCount: 10 },
    { name: "shopImages", maxCount: 10 },
    { name: "gstImages", maxCount: 3 },
    { name: "panCard", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 2 },
  ]),
  dealersCltr.becomeAPartner
);

//dealer info 
app.get("/partner/:userId",dealersCltr.dealerRegisterDetails)
//all dealers 
app.get("/allPartnerList",dealersCltr.AllPartnerList)
//details of all the appointment
app.get("/todaysAppointment/:dealerId",dealersCltr.todaysDealerAppointments)





//users vehicle service history or record
app.get('/service/register/:vehicleNumber',dealersCltr.vehicleServiceList)




app.get('/admin/vehicles/:vehicleNumber' , dealersCltr.getVehicleByNumber)



// Appointment Booking for user
app.post('/user/bookYourAppointment', vehiclesCltr.appointmentBooking);

// Appointment Booking for B2b/b2i
app.post('/user/bookYourb2bAppointment', vehiclesCltr.b2bAppointmentBooking);

// b2b gstin, business details info
app.post('/b2b/fleetInfo',vehiclesCltr.b2bFleetInfo)
app.get('/b2b/fleetGSTINInfo/:email', vehiclesCltr.b2bGSTINFleetInfo);

//all vehicle services price list 
app.post('/vehiclesServicesPrices',vehiclesCltr.vehicleServicesPrices)                   




// service management start

app.post('/service-management/vehicle-received', serviceManagementCltr.vehicleReceived);
app.get('/service-management/vehicle-received/:partnerId', serviceManagementCltr.vehicleReceivedDetails)
//
app.post(
  "/service/estimation",
  upload.fields([{ name: "vehicleServiceEstimationImages", maxCount: 100 },
    {name:"capturedImage", maxCount:150},
  ]),
  serviceManagementCltr.vehicleServiceEstimation

);

// service management end



// service updates for customer 
app.get('/vehicleReceivedStatus/:vehicleNumber',serviceManagementCltr.customerVehicleReceivedDetails)









// // List all vehicles
// app.get('/vehicleregisters', authenticateUser, vehiclesCltr.list);

// // Get details of the logged-in user's vehicle
// app.get('/vehicleregisters/myVehicle', authenticateUser, vehiclesCltr.getVehicleDetails);





// Vehicle routes

// app.get('/api/vehicles', authenticateUser, vehiclesCltr.list);
// app.post('/api/vehicles', authenticateUser, authorizeUser(['admin']), vehiclesCltr.create);


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

