// npm init -y
// npm install express
// server start -----> npm start

const multer = require("multer");
const fs = require("fs");
const path = require("node:path");
const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const configureDB = require("./config/db");
const { checkSchema } = require("express-validator");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const authenticateUser = require("./app/middlewares/authenticateUser");
const authorizeUser = require("./app/middlewares/authorizeUser");

const userLoginValidationSchema = require("./app/validations/user-login-validation");
const appointmentBooking = require("./app/validations/appointment-booking-validation");
const userRegisterValidationSchema = require("./app/validations/user-register-validations");
const vehicleRegisterValidationSchema = require("./app/validations/vehicle-register-validations");
const vehicleServiceValidationSchema = require("./app/validations/vehicle-service-register-validations");
const {
  customerValidationSchema,
  customerEditValidationSchema,
} = require("./app/validations/customer-validation");

const usersCltr = require("./app/controllers/users-cltr");
const dealersCltr = require("./app/controllers/dealers-cltr");
const vehiclesCltr = require("./app/controllers/vehicles-cltr");
const appointmentCltr = require("./app/controllers/vehicles-cltr");
const serviceManagementCltr = require("./app/controllers/service-management-cltr");

const app = express();
const port = process.env.PORT;

configureDB();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Application level middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`);
  next();
});

//file uploads
const upload = multer({
  dest: path.resolve(__dirname, "./uploads"),
  limits: { fileSize: 3e7 }, // 30mb ->  30*1024*1024  for 30mb
}).fields([
  // { name: "coverImage", maxCount: 10 },
  { name: "shopImages", maxCount: 20 },
  { name: "gstImages", maxCount: 10 },
  { name: "panCard", maxCount: 5 },
  { name: "aadhaarCard", maxCount: 4 },
]);

const upload1 = multer({
  dest: path.resolve(__dirname, "./uploads"),
  limits: { fileSize: 3e7 }, // 30MB
}).fields([
  { name: "vehicleServiceEstimationImages", maxCount: 100 },
  { name: "capturedImages", maxCount: 100 },
]);

//vehicle service hardcoded price
const vehicleServicesPrices = require("./app/controllers/vehicles-cltr");

// User routes
//registration
app.post(
  "/users/register",
  checkSchema(userRegisterValidationSchema),
  usersCltr.register
);

//login
app.post(
  "/users/login",
  checkSchema(userLoginValidationSchema),
  usersCltr.login
);



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
app.use(express.urlencoded({ extended: true })); 
app.post("/order",usersCltr.payment);
app.post("/status",usersCltr.status);
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//account information
app.get("/users/account", authenticateUser, usersCltr.account);

// Appointment Booking for user
app.post("/user/bookYourAppointment", vehiclesCltr.appointmentBooking);

//add new vehicle for customer
app.post(
  "/users/addVehicle",
  checkSchema(vehicleRegisterValidationSchema),
  vehiclesCltr.register
);

//get registered vehicle for vehicle owner
app.get("/vehicles/:userId", vehiclesCltr.myVehicles);

//user vehicle service history
app.get("/service/register/:vehicleNumber", vehiclesCltr.vehicleServiceList);

//user appointment history
app.get("/AppointmentsList/:userId", vehiclesCltr.myAppointmentsList);

//users vehicle service history or record
// app.get('/service/register/:vehicleNumber',dealersCltr.vehicleServiceList)                             //temporary comment

//approval or reject of the service estimation
app.get(
  "/user/estService/registerApproval/:userId",
  dealersCltr.priliminaryEsApprovalRejectByUser
);

// approval or reject of the service estimation update
app.put(
  "/user/estService/update/:estimationId",
  dealersCltr.EstApprovalRejectByUser
);
//upload  files in additional approval
app.put(
  "/user/estServiceDismantelingProcess/update/:estimationId",
  upload1,
  dealersCltr.EstDismantelingProcess
);
//getEstimationById in invoice generate
app.get("/invoice/:estimationId", dealersCltr.getEstimationById);

// demooo
app.put(
  "/estService/register1111/:id",
  upload1,
  vehiclesCltr.vehicleServiceUpdate
);
//delete items
app.delete(
  "/estService/register1111/:id/:itemId",
  vehiclesCltr.vehicleServiceItemDelete
);

//B2B/B2I routes
// Appointment Booking for B2b/b2i
app.post("/user/bookYourb2bAppointment", vehiclesCltr.b2bAppointmentBooking);

// b2b gstin, business details info
app.post("/b2b/fleetInfo", vehiclesCltr.b2bFleetInfo);
app.get("/b2b/fleetGSTINInfo/:email", vehiclesCltr.b2bGSTINFleetInfo);

// Dealer routes
// adding new service details of selected user
app.post("/estService/register", upload1, vehiclesCltr.vehicleServiceRegister);
// app.post("/estService/register",
//   upload.fields([
//       { name: "vehicleServiceEstimationImages", maxCount: 10 },
//       { name: "capturedImages", maxCount: 10 }
//   ]),vehiclesCltr.vehicleServiceRegister);

//dealer service history for all vehicles
app.get(
  "/dealer/service/register/:vehicleNumber",
  dealersCltr.vehicleServiceHistory
);
//dealer get est appointment for perticular dealer by dealer
app.get(
  "/dealer/estService/register/:partnerId",
  serviceManagementCltr.priliminaryEstimationApprovalReject
);
//billing details
app.get("/billing/:email", vehiclesCltr.b2bGSTINFleetInfo);

//become a partner register
app.post("/becomeAPartner/dealerRegister", upload, dealersCltr.becomeAPartner);

//dealer info
app.get("/partner/:userId", dealersCltr.dealerRegisterDetails);

//all dealers
app.get("/allPartnerList", dealersCltr.AllPartnerList);

//details of all the appointment
app.get("/todaysAppointment/:dealerId", dealersCltr.todaysDealerAppointments);

//dealer
// service management start

app.post(
  "/service-management/vehicle-received",
  serviceManagementCltr.vehicleReceived
);
app.get(
  "/service-management/vehicle-received/:partnerId",
  serviceManagementCltr.vehicleReceivedDetails
);
//temporary comment
// app.post(
//   "/service/estimation",
//   upload.fields([
//     {name: "vehicleServiceEstimationImages", maxCount: 100 },
//     {name:"capturedImage", maxCount:150},
//   ]),
//   serviceManagementCltr.vehicleServiceEstimation

// );

// service management end

// Admin routes
//admin get vehicle information
app.get("/admin/vehicles/:vehicleNumber", vehiclesCltr.getVehicleByNumber);

//support api
//all vehicle services price list
app.post("/vehiclesServicesPrices", vehiclesCltr.vehicleServicesPrices);

// service updates for customer
app.get(
  "/vehicleReceivedStatus/:vehicleNumber",
  serviceManagementCltr.customerVehicleReceivedDetails
);

// // List all vehicles
// app.get('/vehicleregisters', authenticateUser, vehiclesCltr.list);

// // Get details of the logged-in user's vehicle
// app.get('/vehicleregisters/myVehicle', authenticateUser, vehiclesCltr.getVehicleDetails);
// Vehicle routes

// app.get('/api/vehicles', authenticateUser, vehiclesCltr.list);
// app.post('/api/vehicles', authenticateUser, authorizeUser(['admin']), vehiclesCltr.create);

//test

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
