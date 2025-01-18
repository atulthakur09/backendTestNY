const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const cloudinary = require("../../config/cloudinary");
const Vehicle = require("../models/vehicle-register-model");
const vehicleService = require("../models/vehicle-service-register-model");
const AppointmentBooking = require("../models/appointment-booking-model");
const {vehicleNumber} = require("../validations/vehicle-register-validations");
const { timeSlot } = require("../validations/appointment-booking-validation");
const VehicleRegister = require("../models/vehicle-register-model");
const VehicleServiceRegister = require("../models/vehicle-service-register-model");
const VehicleServicePrices = require("../models/vehicle-service-prices-model");


const B2bFleetInfo = require("../models/b2b-fleet-info-model");

const vehiclesCltr = {};

// Cloudinary folder configuration
const CLOUDINARY_FOLDERS = {
  vehicleServiceEstimationImages: "vehicle-service-estimation-images",
  capturedImages: "captured-images",
};
// Utility function to safely delete files
const safeUnlink = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.warn(`Failed to delete local file at ${filePath}:`, error.message);
  }
};
// Utility function to upload a file to Cloudinary
const safeUploadFileToCloudinary = async (file, folderName) => {
  try {
    const mimeType = file.mimetype.split("/").at(-1); // Extract file extension
    const uniqueFileName = `${Date.now()}-${file.filename}`;
    const filePath = path.resolve(__dirname, "../../uploads", file.filename);

    // Log the local file path
    console.log(`Uploading file to Cloudinary: ${filePath}`);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: uniqueFileName,
      folder: folderName,
      format: mimeType,
    });

    return {
      url: uploadResult.secure_url, // Cloudinary URL
      localPath: filePath, // Local file path
    };
  } catch (error) {
    console.error(`Error uploading file to Cloudinary:`, error.message);
    throw new Error(`File upload failed for ${file.filename}`);
  }
};

// Vehicle service add
// vehiclesCltr.vehicleServiceRegister = async (req, res) => {
//   try {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log("Validation errors:", errors.array());
//         return res.status(400).json({ success: false, errors: errors.array() });
//     }
//     const files = req.files;
//     // Validate required files
//     if (!req.files || !req.files.vehicleServiceEstimationImages || !req.files.capturedImages) {
//       return res.status(400).json({ success: false, error: "Missing required files" });
//     }

//      // Upload files concurrently to Cloudinary
//      const uploadResults = await Promise.all([
//       safeUploadFileToCloudinary(files.vehicleServiceEstimationImages[0], CLOUDINARY_FOLDERS.vehicleServiceEstimationImages),
//       safeUploadFileToCloudinary(files.capturedImages[0], CLOUDINARY_FOLDERS.capturedImages)
//     ]);
    
//     const [vehicleServiceEstimationImagesResult, capturedImagesResult] = uploadResults;
//     // Log uploaded URLs and local paths for debugging
//     console.log("Uploaded URLs and Local Paths:", {
//       vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult,
//       capturedImages: capturedImagesResult,
//     });
//     // Create a new partner entry
//     const estimationVehicleService = new VehicleServiceRegister({
//       ...req.body,
//       vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult.url,
//       capturedImages: capturedImagesResult.url
//     });
//     // Save the new record
//     await estimationVehicleService.save();

//     // Cleanup local files after successful save
//     await Promise.all([
//       safeUnlink(vehicleServiceEstimationImagesResult.localPath),
//       safeUnlink(capturedImagesResult.localPath)
//     ]);
//     // Return success response
//     res.status(201).json(estimationVehicleService);
//   } catch (err) {
//     console.error("Error in creating estimation service:", err);
//     res.status(500).json({
//       error: "Something went wrong while creating estimation service",
//     });
//   }
// };

//working but only one image uploaded


// vehiclesCltr.vehicleServiceRegister = async (req, res) => {
//   try {
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     // Validate and parse items
//     const data = req.body;
//     if (data.items && typeof data.items === "string") {
//       try {
//         data.items = JSON.parse(data.items);
//       } catch (err) {
//         return res.status(400).json({ success: false, error: "Invalid format for items field" });
//       }
//     }

//     const files = req.files;
//     // Validate required files
//     if (!files || !files.vehicleServiceEstimationImages || !files.capturedImages) {
//       return res.status(400).json({ success: false, error: "Missing required files" });
//     }

//     // Upload files concurrently to Cloudinary
//     const [vehicleServiceEstimationImagesResult, capturedImagesResult] = await Promise.all([
//       safeUploadFileToCloudinary(files.vehicleServiceEstimationImages[0], CLOUDINARY_FOLDERS.vehicleServiceEstimationImages),
//       safeUploadFileToCloudinary(files.capturedImages[0], CLOUDINARY_FOLDERS.capturedImages)
//     ]);

//     // Log uploaded URLs for debugging
//     console.log("Uploaded URLs:", {
//       vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult.url,
//       capturedImages: capturedImagesResult.url,
//     });

//     // Create a new VehicleService entry
//     const estimationVehicleService = new VehicleServiceRegister({
//       ...data,
//       vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult.url,
//       capturedImages: capturedImagesResult.url
//     });

//     // Save the new record
//     await estimationVehicleService.save();

//     // Cleanup local files
//     await Promise.all([
//       safeUnlink(vehicleServiceEstimationImagesResult.localPath),
//       safeUnlink(capturedImagesResult.localPath)
//     ]);

//     // Return success response
//     res.status(201).json(estimationVehicleService);
//   } catch (err) {
//     console.error("Error in creating estimation service:", err);
//     res.status(500).json({
//       error: "Something went wrong while creating estimation service",
//     });
//   }
// };

// vehiclesCltr.vehicleServiceRegister = async (req, res) => {
//   try {
//     // Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     // Validate and parse items
//     const data = req.body;
//     if (data.items && typeof data.items === "string") {
//       try {
//         data.items = JSON.parse(data.items);
//       } catch (err) {
//         return res.status(400).json({ success: false, error: "Invalid format for items field" });
//       }
//     }

//     const files = req.files;
//     // Extract files or initialize them as empty arrays if not provided
//     //new
// const vehicleServiceEstimationImages = files?.vehicleServiceEstimationImages || [];
// const capturedImages = files?.capturedImages || [];
// if (vehicleServiceEstimationImages.length === 0 && capturedImages.length === 0) {
//   console.log("No files were uploaded, proceeding without files.");
// }

// //new end

//     // Validate required files
//     // if (!files || !files.vehicleServiceEstimationImages || !files.capturedImages) {
//     //   return res.status(400).json({ success: false, error: "Missing required files" });
//     // }

//     // Prepare arrays to hold upload results
//     const uploadedVehicleServiceEstimationImages = [];
//     const uploadedCapturedImages = [];

//     // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
//     const vehicleServiceEstimationImagesUploads = files.vehicleServiceEstimationImages.map(async (file, index) => {
//       const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.vehicleServiceEstimationImages);
//       uploadedVehicleServiceEstimationImages.push(uploadResult.url);
//     });

//     // Upload all capturedImages files concurrently to Cloudinary
//     const capturedImagesUploads = files.capturedImages.map(async (file, index) => {
//       const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.capturedImages);
//       uploadedCapturedImages.push(uploadResult.url);
//     });

//     // Wait for all uploads to finish
//     await Promise.all([...vehicleServiceEstimationImagesUploads, ...capturedImagesUploads]);

//     // Log uploaded URLs for debugging
//     console.log("Uploaded URLs:", {
//       vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages,
//       capturedImages: uploadedCapturedImages,
//     });

//     // Create a new VehicleService entry
//     const estimationVehicleService = new VehicleServiceRegister({
//       ...data,
//       vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages, // Store the array of URLs
//       capturedImages: uploadedCapturedImages, // Store the array of URLs
//     });

//     // Save the new record
//     await estimationVehicleService.save();

//     // Cleanup local files
//     await Promise.all([
//       ...files.vehicleServiceEstimationImages.map((file) => safeUnlink(file.path)),
//       ...files.capturedImages.map((file) => safeUnlink(file.path)),
//     ]);

//     // Return success response
//     res.status(201).json(estimationVehicleService);
//   } catch (err) {
//     console.error("Error in creating estimation service:", err);
//     res.status(500).json({
//       error: "Something went wrong while creating estimation service",
//     });
//   }
// };
vehiclesCltr.vehicleServiceRegister = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Parse and validate items if provided
    const data = req.body;
    if (data.items && typeof data.items === "string") {
      try {
        data.items = JSON.parse(data.items);
      } catch (err) {
        return res.status(400).json({ success: false, error: "Invalid format for items field" });
      }
    }

    // Extract files or initialize empty arrays
    const files = req.files || {};
    const vehicleServiceEstimationImages = files.vehicleServiceEstimationImages || [];
    const capturedImages = files.capturedImages || [];

    if (vehicleServiceEstimationImages.length === 0 && capturedImages.length === 0) {
      console.log("No files were uploaded, proceeding without files.");
    }

    // Prepare arrays to hold upload results
    const uploadedVehicleServiceEstimationImages = [];
    const uploadedCapturedImages = [];

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const vehicleServiceEstimationImagesUploads = vehicleServiceEstimationImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.vehicleServiceEstimationImages);
      uploadedVehicleServiceEstimationImages.push(uploadResult.url);
    });

    // Upload all capturedImages files concurrently to Cloudinary
    const capturedImagesUploads = capturedImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.capturedImages);
      uploadedCapturedImages.push(uploadResult.url);
    });

    // Wait for all uploads to finish
    await Promise.all([...vehicleServiceEstimationImagesUploads, ...capturedImagesUploads]);

    // Log uploaded URLs for debugging
    console.log("Uploaded URLs:", {
      vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages,
      capturedImages: uploadedCapturedImages,
    });

    // Create a new VehicleService entry
    const estimationVehicleService = new VehicleServiceRegister({
      ...data,
      vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages, // Store the array of URLs
      capturedImages: uploadedCapturedImages, // Store the array of URLs
    });

    // Save the new record
    await estimationVehicleService.save();

    // Cleanup local files
    const cleanupPromises = [
      ...vehicleServiceEstimationImages.map((file) => safeUnlink(file.path)),
      ...capturedImages.map((file) => safeUnlink(file.path)),
    ];
    await Promise.all(cleanupPromises);

    // Return success response
    res.status(201).json(estimationVehicleService);
  } catch (err) {
    console.error("Error in creating estimation service:", err);
    res.status(500).json({
      error: "Something went wrong while creating estimation service",
    });
  }
};



//gettttttttttttt
vehiclesCltr.vehicleServiceUpdate = async (req, res) => {
  try {
    const { id } = req.params; // Get the record ID from the request parameters

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Parse and validate items if provided
    const data = req.body;
    if (data.items && typeof data.items === "string") {
      try {
        data.items = JSON.parse(data.items);
      } catch (err) {
        return res.status(400).json({ success: false, error: "Invalid format for items field" });
      }
    }

    // Find the record to update
    const vehicleService = await VehicleServiceRegister.findById(id);
    if (!vehicleService) {
      return res.status(404).json({ success: false, error: "Record not found" });
    }

    // Extract files or initialize empty arrays
    const files = req.files || {};
    const vehicleServiceEstimationImages = files.vehicleServiceEstimationImages || [];
    const capturedImages = files.capturedImages || [];

    if (vehicleServiceEstimationImages.length === 0 && capturedImages.length === 0) {
      console.log("No files were uploaded, proceeding without files.");
    }

    // Prepare arrays to hold upload results
    const uploadedVehicleServiceEstimationImages = [];
    const uploadedCapturedImages = [];

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const vehicleServiceEstimationImagesUploads = vehicleServiceEstimationImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.vehicleServiceEstimationImages);
      uploadedVehicleServiceEstimationImages.push(uploadResult.url);
    });

    // Upload all capturedImages files concurrently to Cloudinary
    const capturedImagesUploads = capturedImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.capturedImages);
      uploadedCapturedImages.push(uploadResult.url);
    });

    // Wait for all uploads to finish
    await Promise.all([...vehicleServiceEstimationImagesUploads, ...capturedImagesUploads]);

    // Log uploaded URLs for debugging
    console.log("Uploaded URLs:", {
      vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages,
      capturedImages: uploadedCapturedImages,
    });

    // Update the record
    vehicleService.vehicleServiceEstimationImages.push(...uploadedVehicleServiceEstimationImages); // Append new URLs
    vehicleService.capturedImages.push(...uploadedCapturedImages); // Append new URLs
    Object.assign(vehicleService, data); // Update other fields

    // Save the updated record
    await vehicleService.save();

    // Cleanup local files
    const cleanupPromises = [
      ...vehicleServiceEstimationImages.map((file) => safeUnlink(file.path)),
      ...capturedImages.map((file) => safeUnlink(file.path)),
    ];
    await Promise.all(cleanupPromises);

    // Return success response
    res.status(200).json(vehicleService);
  } catch (err) {
    console.error("Error in updating estimation service:", err);
    res.status(500).json({
      error: "Something went wrong while updating estimation service",
    });
  }
};




// Register a new vehicle
vehiclesCltr.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  console.log("Request body:", body);

  try {
    // Check if the vehicle number is already registered
    const existingVehicle = await Vehicle.findOne({
      vehicleNumber: body.vehicleNumber,
    });
    if (existingVehicle) {
      console.log("Vehicle already registered:", existingVehicle);
      return res
        .status(400)
        .json({ error: "Vehicle Number is already registered" });
    }

    // Check if the mobile number is already registered
    const existingMobile = await Vehicle.findOne({ contact: body.contact });
    if (existingMobile) {
      console.log("Mobile number already registered with:", existingMobile);
      if (
        existingMobile.userName === body.userName &&
        existingMobile.contact === body.contact
      ) {
        const newVehicle = new Vehicle(body);
        await newVehicle.save();
        return res.status(201).json(newVehicle);
      } else {
        console.log("Mobile number registered with different details.");
        return res.status(400).json({
          error:
            "Mobile Number is already registered with different user details",
        });
      }
    }

    // If the mobile number doesn't exist, then proceed to save the new vehicle
    const newVehicle = new Vehicle(body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    console.error("Error in vehicle registration:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while registering the vehicle" });
  }
};

//  Fetch all vehicles for admin

vehiclesCltr.getVehicleByNumber = async (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;
  try {
    const vehicles = await Vehicle.findOne({ vehicleNumber: vehicleNumber });
    if (vehicles.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicles);
  } catch (err) {
    console.error("Error in fetching vehicle:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the vehicle" });
  }
};

//  Fetch all vehicles for user

vehiclesCltr.myVehicles = async (req, res) => {
  const userId = req.params.userId;
  try {
    const vehicles = await Vehicle.find({ userId: userId });
    if (vehicles.length === 0) {
      return res.status(404).json({ error: "No vehicles found for this user" });
    }
    res.json(vehicles);
  } catch (err) {
    console.error("Error in fetching vehicles:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the vehicles" });
  }
};

//for customers
vehiclesCltr.appointmentBooking = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    userId,
    dealerId,
    name,
    contact,
    email,
    date,
    timeSlot,
    vehicleNumber,
    serviceType,
    pickupAndDrop,
    pickupAndDropAddress,
  } = req.body;

  try {
    // Check if the same time slot is already booked for the same vehicle number
    const existingAppointment = await AppointmentBooking.findOne({
      vehicleNumber,
      date,
      timeSlot,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ error: "This time slot is already booked for this vehicle." });
    }

    // Create a new appointment
    const newAppointment = new AppointmentBooking({
      userId, // Save userId
      dealerId,
      name,
      contact,
      email,
      date,
      timeSlot,
      vehicleNumber,
      serviceType,
      pickupAndDrop,
      pickupAndDropAddress,
    });

    // Save to db
    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//for b2b/b2i
vehiclesCltr.b2bAppointmentBooking = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    userId,
    dealerId,
    name,
    contact,
    email,
    date,
    timeSlot,
    vehicleNumber,
    serviceType,
    pickupAndDrop,
    pickupAddress,
    dropAddress,
    billingAddress,
  } = req.body;

  try {
    // Check if the same time slot is already booked for the same vehicle number
    const existingAppointment = await AppointmentBooking.findOne({
      vehicleNumber,
      date,
      timeSlot,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ error: "This time slot is already booked for this vehicle." });
    }

    // Create a new appointment
    const newAppointment = new AppointmentBooking({
      userId, // Save userId
      dealerId,
      name,
      contact,
      email,
      date,
      timeSlot,
      vehicleNumber,
      serviceType,
      pickupAndDrop,
      pickupAddress,
      dropAddress,
      billingAddress,
    });

    // Save to db
    await newAppointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// add gst, billing address , name of office for b2b customer

vehiclesCltr.b2bFleetInfo = async (req, res) => {
  const { email, contact, businessName, billingAddress, gstin } = req.body;

  try {
    // Check if GSTIN already exists
    const fleetInfo = await B2bFleetInfo.findOne({ gstin });
    if (fleetInfo) {
      return res
        .status(400)
        .json({ error: "GSTIN is already registered with another user." });
    }

    // Create a new B2B Fleet entry
    const newGSTIN = new B2bFleetInfo({
      email,
      contact,
      businessName,
      gstin,
      billingAddress,
    });

    // Save to database
    await newGSTIN.save();

    return res.status(201).json({
      message: "GSTIN is successfully registered.",
      fleetInfo: newGSTIN,
    });
  } catch (error) {
    console.error("Error in GSTIN registration", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//get gstin info
vehiclesCltr.b2bGSTINFleetInfo = async (req, res) => {
  const { email } = req.params; // Extract email from URL parameters

  try {
    // Find fleet info using the provided email
    const fleetInfo = await B2bFleetInfo.findOne({ email });

    if (!fleetInfo) {
      return res
        .status(404)
        .json({ error: "No fleet information found for the provided email." });
    }

    return res.status(200).json({
      message: "Fleet information retrieved successfully.",
      data: fleetInfo,
    });
  } catch (error) {
    console.error("Error retrieving fleet information", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};





// Vehicle service List of vehicle
vehiclesCltr.vehicleServiceList = async (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;

  try {
    const vehicleServices = await VehicleService.find({
      vehicleNumber: vehicleNumber,
    });

    if (vehicleServices.length === 0) {
      return res
        .status(404)
        .json({ error: "Vehicle service details not found" });
    }

    res.json(vehicleServices);
  } catch (error) {
    console.error("Error fetching vehicle service details:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update vehicle details                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
vehiclesCltr.updateVehicle = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const body = req.body;

  try {
    const vehicle = await Vehicle.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    console.error("Error in updating vehicle:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while updating the vehicle" });
  }
};

// Delete a vehicle                                   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
vehiclesCltr.deleteVehicle = async (req, res) => {
  const vehicleId = req.params.vehicleId;

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicle._id);
    if (!deletedVehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    console.error("Error in deleting vehicle:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while deleting the vehicle" });
  }
};

//Manual save all prices
//vehicleServicesPricesList
vehiclesCltr.vehicleServicesPrices = async (req, res) => {
  try {
    const {
      brand,
      model,
      periodicServices,
      acServiceRepair,
      batteries,
      tyresWheelCare,
      dentingPainting,
      detailingService,
      carSpaCleaningService,
      carInspection,
      windshieldsLights,
      suspensionFitments,
      clutchBodyParts,
      insurance,
    } = req.body;

    // Validate input
    if (
      !brand ||
      !model ||
      !Array.isArray(periodicServices) ||
      !Array.isArray(acServiceRepair) ||
      !Array.isArray(batteries) ||
      !Array.isArray(tyresWheelCare) ||
      !Array.isArray(dentingPainting) ||
      !Array.isArray(detailingService) ||
      !Array.isArray(carSpaCleaningService) ||
      !Array.isArray(carInspection) ||
      !Array.isArray(windshieldsLights) ||
      !Array.isArray(suspensionFitments) ||
      !Array.isArray(clutchBodyParts) ||
      !Array.isArray(insurance)
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required and must be arrays" });
    }

    // Create a new vehicle service record
    const newService = new VehicleServicePrices({
      brand,
      model,
      periodicServices,
      acServiceRepair,
      batteries,
      tyresWheelCare,
      dentingPainting,
      detailingService,
      carSpaCleaningService,
      carInspection,
      windshieldsLights,
      suspensionFitments,
      clutchBodyParts,
      insurance,
    });

    // Save to database
    await newService.save();

    res
      .status(201)
      .json({ message: "Service details saved successfully", newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//user Appointment List
vehiclesCltr.myAppointmentsList = async (req, res) => {
  const userId = req.params.userId;
  try {
    const appointments = await AppointmentBooking.find({ userId: userId });

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "No appointment found for this user" });
    }

    res.json(appointments);
  } catch (err) {
    console.error("Error in fetching appointments:", err);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the appointments" });
  }
};

// // Check if the vehicle is already registered
// vehiclesCltr.checkVehicleNumber = async (req, res) => {
//     const { vehicleNumber } = req.params; // Get vehicleNumber from request params

//     try {
//         // Check if the vehicle number is already registered
//         const existingVehicle = await Vehicle.findOne({ vehicleNumber: vehicleNumber });
//         if (existingVehicle) {
//             console.log("Vehicle already registered:", existingVehicle);
//             return res.status(400).json({ error: 'Vehicle Number is already registered' });
//         }
//         return res.status(200).json({ message: 'Vehicle number is available' }); // Vehicle is not registered
//     } catch (error) {
//         console.error("Error checking vehicle registration:", error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Check if the mobile number is already registered
// vehiclesCltr.checkMobile = async (req, res) => {
//     const { mobile } = req.params; // Get mobile from request params

//     try {
//         const existingMobile = await Vehicle.findOne({ contact: mobile }); // Use mobile from req.params
//         if (existingMobile) {
//             console.log("Mobile number already registered with:", existingMobile);
//             return res.status(400).json({ error: 'Mobile Number is already registered' });
//         }
//         return res.status(200).json({ message: 'Mobile number is available' }); // Mobile is not registered
//     } catch (error) {
//         console.error("Error checking mobile registration:", error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports = vehiclesCltr;

// const Vehicle = require('../models/vehicle-register-model'); 
// const vehicleService = require("../models/vehicle-service-register-model")
// const AppointmentBooking = require('../models/appointment-booking-model')
// const { validationResult } = require('express-validator');
// const { vehicleNumber } = require('../validations/vehicle-register-validations');
// const { timeSlot } = require('../validations/appointment-booking-validation');
// const VehicleRegister = require('../models/vehicle-register-model');
// const vehicleServiceRegister  = require('../models/vehicle-service-register-model');
// const VehicleServicePrices= require('../models/vehicle-service-prices-model')
// const cloudinary = require('../../config/cloudinary');
// const path = require('node:path');
// const fs = require('node:fs');

// const B2bFleetInfo = require('../models/b2b-fleet-info-model')

// const vehiclesCltr = {};


// // Register a new vehicle
// vehiclesCltr.register = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log("Validation errors:", errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const body = req.body;
//     console.log("Request body:", body);

//     try {
//         // Check if the vehicle number is already registered
//         const existingVehicle = await Vehicle.findOne({ vehicleNumber: body.vehicleNumber });
//         if (existingVehicle) {
//             console.log("Vehicle already registered:", existingVehicle);
//             return res.status(400).json({ error: 'Vehicle Number is already registered' });
//         }

//         // Check if the mobile number is already registered
//         const existingMobile = await Vehicle.findOne({ contact: body.contact });
//         if (existingMobile) {
//             console.log("Mobile number already registered with:", existingMobile);
//             if (existingMobile.userName === body.userName && existingMobile.contact === body.contact) {
//                 const newVehicle = new Vehicle(body);
//                 await newVehicle.save();
//                 return res.status(201).json(newVehicle);
//             } else {
//                 console.log("Mobile number registered with different details.");
//                 return res.status(400).json({ error: 'Mobile Number is already registered with different user details' });
//             }
//         }

//         // If the mobile number doesn't exist, then proceed to save the new vehicle
//         const newVehicle = new Vehicle(body);
//         await newVehicle.save();
//         res.status(201).json(newVehicle);
//     } catch (err) {
//         console.error("Error in vehicle registration:", err);
//         res.status(500).json({ error: 'Something went wrong while registering the vehicle' });
//     }
// };

// //  Fetch all vehicles for admin 

// vehiclesCltr.getVehicleByNumber = async (req, res) => {
//     const vehicleNumber = req.params.vehicleNumber;
//     try {
//         const vehicles = await Vehicle.findOne({ vehicleNumber: vehicleNumber });
//         if (vehicles.length === 0) {
//             return res.status(404).json({ error: 'Vehicle not found' });
//         }
//         res.json(vehicles);
//     } catch (err) {
//         console.error("Error in fetching vehicle:", err);
//         res.status(500).json({ error: 'Something went wrong while fetching the vehicle' });
//     }
// };

// //  Fetch all vehicles for user

// vehiclesCltr.myVehicles = async (req, res) => {
//     const userId = req.params.userId;
//     try {

//         const vehicles = await Vehicle.find({ userId: userId });
//         if (vehicles.length === 0) {
//             return res.status(404).json({ error: 'No vehicles found for this user' });
//         }
//         res.json(vehicles);
//     } catch (err) {
//         console.error("Error in fetching vehicles:", err);
//         res.status(500).json({ error: 'Something went wrong while fetching the vehicles' });
//     }
// };

// //for customers
// vehiclesCltr.appointmentBooking = async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { userId,dealerId, name, contact,email , date, timeSlot, vehicleNumber, serviceType, pickupAndDrop, pickupAndDropAddress } = req.body;

//     try {
//         // Check if the same time slot is already booked for the same vehicle number
//         const existingAppointment = await AppointmentBooking.findOne({ vehicleNumber, date, timeSlot });
//         if (existingAppointment) {
//             return res.status(400).json({ error: 'This time slot is already booked for this vehicle.' });
//         }

//         // Create a new appointment
//         const newAppointment = new AppointmentBooking({
//             userId,  // Save userId
//             dealerId,
//             name,
//             contact,
//             email,
//             date,
//             timeSlot,
//             vehicleNumber,
//             serviceType,
//             pickupAndDrop,
//             pickupAndDropAddress,
            

//         });

//         // Save to db
//         await newAppointment.save();

//         return res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

// //for b2b/b2i
// vehiclesCltr.b2bAppointmentBooking = async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { userId,dealerId, name, contact,email , date, timeSlot, vehicleNumber, serviceType, pickupAndDrop, pickupAddress, dropAddress,billingAddress } = req.body;

//     try {
//         // Check if the same time slot is already booked for the same vehicle number
//         const existingAppointment = await AppointmentBooking.findOne({ vehicleNumber, date, timeSlot });
//         if (existingAppointment) {
//             return res.status(400).json({ error: 'This time slot is already booked for this vehicle.' });
//         }

//         // Create a new appointment
//         const newAppointment = new AppointmentBooking({
//             userId,  // Save userId
//             dealerId,
//             name,
//             contact,
//             email,
//             date,
//             timeSlot,
//             vehicleNumber,
//             serviceType,
//             pickupAndDrop,
//             pickupAddress,
//             dropAddress,
//             billingAddress,
            

//         });

//         // Save to db
//         await newAppointment.save();

//         return res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


// // add gst, billing address , name of office for b2b customer

// vehiclesCltr.b2bFleetInfo = async (req, res) => {
//     const { email, contact, businessName, billingAddress, gstin } = req.body;

//     try {
//         // Check if GSTIN already exists
//         const fleetInfo = await B2bFleetInfo.findOne({ gstin });
//         if (fleetInfo) {
//             return res.status(400).json({ error: "GSTIN is already registered with another user." });
//         }

//         // Create a new B2B Fleet entry
//         const newGSTIN = new B2bFleetInfo({
//             email,
//             contact,
//             businessName,
//             gstin,
//             billingAddress,
//         });

//         // Save to database
//         await newGSTIN.save();

//         return res.status(201).json({ message: "GSTIN is successfully registered.", fleetInfo: newGSTIN });
//     } catch (error) {
//         console.error("Error in GSTIN registration", error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// //get gstin info
// vehiclesCltr.b2bGSTINFleetInfo = async (req, res) => {
//     const { email } = req.params; // Extract email from URL parameters

//     try {
//         // Find fleet info using the provided email
//         const fleetInfo = await B2bFleetInfo.findOne({ email });

//         if (!fleetInfo) {
//             return res.status(404).json({ error: "No fleet information found for the provided email." });
//         }

//         return res.status(200).json({ message: "Fleet information retrieved successfully.", data: fleetInfo });
//     } catch (error) {
//         console.error("Error retrieving fleet information", error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// };

// // vehiclesCltr.b2bGSTINFleetInfo = async (req, res) => {
// //     const { gstin, email, contact } = req.query; // Extract query parameters

// //     try {
// //         // Build query dynamically based on provided parameters
// //         const query = {};
// //         if (gstin) query.gstin = gstin;
// //         if (email) query.email = email;
// //         if (contact) query.contact = contact;

// //         // Find fleet info based on the query
// //         const fleetInfo = await B2bFleetInfo.find(query);

// //         if (!fleetInfo || fleetInfo.length === 0) {
// //             return res.status(404).json({ error: "No fleet information found with the provided criteria." });
// //         }

// //         return res.status(200).json({ message: "Fleet information retrieved successfully.", data: fleetInfo });
// //     } catch (error) {
// //         console.error("Error retrieving fleet information", error);
// //         return res.status(500).json({ error: "Internal server error." });
// //     }
// // };



// // Utility function to upload files to Cloudinary
// const uploadFileToCloudinary = async (file, folderName) => {
//     console.log("file name here 263",file)
//     const mimeType = file.mimetype.split("/").at(-1); // Get file extension
//     const fileName = file.filename; // Get the filename generated by multer
//     const filePath = path.resolve(__dirname, "../../uploads", fileName); // Get full path
  
//     // Log the local file path
//     console.log(`Local file path for ${fileName}: ${filePath}`);
  
//     const uploadResult = await cloudinary.uploader.upload(filePath, {
//       filename_override: fileName,
//       folder: folderName,
//       format: mimeType,
//     });
  
//     return {
//       url: uploadResult.secure_url, // Cloudinary URL
//       localPath: filePath // Local file path
//     };
//   };



// // Vehicle service add
// vehiclesCltr.vehicleServiceRegister = async (req, res) => {
//   try {
//     // VehicleServiceRegister
//     // Validate request
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //     console.log("Validation errors:", errors.array());
//     //     return res.status(400).json({ success: false, errors: errors.array() });
//     // }

//     // Validate required files
//     if (
//       !req.files ||
//       !req.files.vehicleServiceEstimationImages ||
//       !req.files.capturedImages
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Missing required files" });
//     }

//     // Upload files to Cloudinary
//     const vehicleServiceEstimationImagesResult = await uploadFileToCloudinary(
//       req.files.vehicleServiceEstimationImages[0],
//       "vehicle-service-estimation-images"
//     );

//     const capturedImagesResult = await uploadFileToCloudinary(
//       req.files.capturedImages[0],
//       "captured-images"
//     );
//     console.log("here");

//     // Create a new service entry
//     const newVehicleServiceRegister = new VehicleServiceRegister({
//       ...req.body,
//       vehicleServiceEstimation: vehicleServiceEstimationImagesResult.secure_url,
//       capturedImages: capturedImagesResult.secure_url,
//     });
//     console.log("newVehicleServiceRegister320", newVehicleServiceRegister);

//     // Save the new record
//     await newVehicleServiceRegister.save();

//     // Delete temporary files after successful upload
//     await fs.promises.unlink(req.files.vehicleServiceEstimationImages[0].path);
//     await fs.promises.unlink(req.files.capturedImages[0].path);

//     // Return success response
//     res.status(201).json({ success: true, data: newVehicleServiceRegister });
//   } catch (err) {
//     console.error("Error in creating estimation service:", err);
//     res.status(500).json({
//       error: "Something went wrong while creating estimation service",
//     });
//   }
// };


// // Vehicle service List of vehicle
// vehiclesCltr.vehicleServiceList = async (req, res) => {
//     const vehicleNumber = req.params.vehicleNumber;
    
//     try {
        
//         const vehicleServices = await VehicleService.find({ vehicleNumber: vehicleNumber });

//         if (vehicleServices.length === 0) {
//             return res.status(404).json({ error: "Vehicle service details not found" });
//         }

//         res.json(vehicleServices); 
//     } catch (error) {
//         console.error('Error fetching vehicle service details:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };





// // Update vehicle details                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// vehiclesCltr.updateVehicle = async (req, res) => {
//     const vehicleId = req.params.vehicleId;  
//     const body = req.body;

//     try {
        
//         const vehicle = await Vehicle.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });
//         if (!vehicle) {
//             return res.status(404).json({ error: 'Vehicle not found' });
//         }
//         res.json(vehicle);
//     } catch (err) {
//         console.error("Error in updating vehicle:", err);
//         res.status(500).json({ error: 'Something went wrong while updating the vehicle' });
//     }
// };








// // Delete a vehicle                                   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// vehiclesCltr.deleteVehicle = async (req, res) => {
//     const vehicleId = req.params.vehicleId;

//     try {
//         const deletedVehicle = await Vehicle.findByIdAndDelete(vehicle._id);
//         if (!deletedVehicle) {
//             return res.status(404).json({ error: 'Vehicle not found' });
//         }
//         res.json({ message: 'Vehicle deleted successfully' });
//     } catch (err) {
//         console.error("Error in deleting vehicle:", err);
//         res.status(500).json({ error: 'Something went wrong while deleting the vehicle' });
//     }
// };








// //Manual save all prices 
// //vehicleServicesPricesList
// vehiclesCltr.vehicleServicesPrices = async  (req, res) => {
//     try {
//         const { brand, model, periodicServices, acServiceRepair, batteries, tyresWheelCare, dentingPainting, detailingService, carSpaCleaningService, carInspection, windshieldsLights, suspensionFitments, clutchBodyParts, insurance } = req.body;
    
//         // Validate input
//         if (!brand || !model || !Array.isArray(periodicServices) || !Array.isArray(acServiceRepair) || !Array.isArray(batteries) || !Array.isArray(tyresWheelCare) || !Array.isArray(dentingPainting) || !Array.isArray(detailingService) || !Array.isArray(carSpaCleaningService) || !Array.isArray(carInspection) || !Array.isArray(windshieldsLights) || !Array.isArray(suspensionFitments) || !Array.isArray(clutchBodyParts) || !Array.isArray(insurance)) {
//           return res.status(400).json({ error: "All fields are required and must be arrays" });
//         }
    
//         // Create a new vehicle service record
//         const newService = new VehicleServicePrices({
//           brand,
//           model,
//           periodicServices,
//           acServiceRepair,
//           batteries,
//           tyresWheelCare,
//           dentingPainting,
//           detailingService,
//           carSpaCleaningService,
//           carInspection,
//           windshieldsLights,
//           suspensionFitments,
//           clutchBodyParts,
//           insurance
//         });
    
//         // Save to database
//         await newService.save();
    
//         res.status(201).json({ message: 'Service details saved successfully', newService });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     };










// //user Appointment List
// vehiclesCltr.myAppointmentsList = async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const appointments = await AppointmentBooking.find({ userId: userId });
        
//         if (appointments.length === 0) {
//             return res.status(404).json({ error: 'No appointment found for this user' });
//         }
        
//         res.json(appointments);
//     } catch (err) {
//         console.error("Error in fetching appointments:", err);
//         res.status(500).json({ error: 'Something went wrong while fetching the appointments' });
//     }
// };

// // // Check if the vehicle is already registered
// // vehiclesCltr.checkVehicleNumber = async (req, res) => {
// //     const { vehicleNumber } = req.params; // Get vehicleNumber from request params
  
// //     try {
// //         // Check if the vehicle number is already registered
// //         const existingVehicle = await Vehicle.findOne({ vehicleNumber: vehicleNumber });
// //         if (existingVehicle) {
// //             console.log("Vehicle already registered:", existingVehicle);
// //             return res.status(400).json({ error: 'Vehicle Number is already registered' });
// //         }
// //         return res.status(200).json({ message: 'Vehicle number is available' }); // Vehicle is not registered
// //     } catch (error) {
// //         console.error("Error checking vehicle registration:", error);
// //         return res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // };

// // // Check if the mobile number is already registered
// // vehiclesCltr.checkMobile = async (req, res) => {
// //     const { mobile } = req.params; // Get mobile from request params
  
// //     try {
// //         const existingMobile = await Vehicle.findOne({ contact: mobile }); // Use mobile from req.params
// //         if (existingMobile) {
// //             console.log("Mobile number already registered with:", existingMobile);
// //             return res.status(400).json({ error: 'Mobile Number is already registered' });
// //         }
// //         return res.status(200).json({ message: 'Mobile number is available' }); // Mobile is not registered
// //     } catch (error) {
// //         console.error("Error checking mobile registration:", error);
// //         return res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // };




// module.exports = vehiclesCltr;