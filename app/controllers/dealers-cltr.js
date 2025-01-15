const path = require('node:path');
const fs = require('node:fs');
const mongoose = require('mongoose');

const { validationResult } = require('express-validator');
const cloudinary = require('../../config/cloudinary');
const BecomeAPartner = require('../models/become-a-partner-model');
const PartnerDetails = require('../models/become-a-partner-model');
const AllPartnerList = require('../models/become-a-partner-model');
const TodaysDealerAppointment = require("../models/appointment-booking-model")


const VehicleService = require('../models/vehicle-service-register-model'); 
const Estimation = require('../models/vehicle-service-register-model'); 
const VehicleRegister = require('../models/vehicle-register-model');
const dealersCltr = {};


// Cloudinary folder configuration
const CLOUDINARY_FOLDERS = {
  shopImages: "shop-images",
  gstImages: "gst-images",
  panCards: "pan-cards",
  aadhaarCards: "aadhaar-cards",
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
// // Utility function to safely delete files
// const safeUnlink = async (filePath) => {
//   try {
//     await fs.promises.unlink(filePath);
//   } catch (error) {
//     console.warn(`Failed to delete local file at ${filePath}:`, error.message);
//   }
// };

// // Utility function to upload a file to Cloudinary
// const safeUploadFileToCloudinary = async (file, folderName) => {
//   try {
//     const mimeType = file.mimetype.split("/").at(-1); // Extract file extension
//     const uniqueFileName = `${Date.now()}-${file.filename}`;
//     const filePath = path.resolve(__dirname, "../../uploads", file.filename);

//     // Log the local file path
//     console.log(`Uploading file to Cloudinary: ${filePath}`);

//     const uploadResult = await cloudinary.uploader.upload(filePath, {
//       filename_override: uniqueFileName,
//       folder: folderName,
//       format: mimeType,
//     });

//     return {
//       url: uploadResult.secure_url, // Cloudinary URL
//       localPath: filePath, // Local file path
//     };
//   } catch (error) {
//     console.error(`Error uploading file to Cloudinary:`, error.message);
//     throw new Error(`File upload failed for ${file.filename}`);
//   }
// };

// Partner registration controller
// dealersCltr.becomeAPartner = async (req, res) => {
//   try {
//     // Validate the request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Get uploaded files
//     const files = req.files;
//     if (!files || !files.shopImages || !files.gstImages || !files.panCard || !files.aadhaarCard) {
//       return res.status(400).json({ error: "Missing required files" });
//     }

//     // Validate file types and sizes (example: shopImages)
//     if (files.shopImages[0].size > 5 * 1024 * 1024) { // 5MB size limit
//       return res.status(400).json({ error: "Shop images file size exceeds the 5MB limit" });
//     }
//     if (!["image/jpeg", "image/png"].includes(files.shopImages[0].mimetype)) {
//       return res.status(400).json({ error: "Invalid file type for shop images. Only JPEG and PNG are allowed." });
//     }

//     // Upload files concurrently to Cloudinary
//     const uploadResults = await Promise.all([
//       safeUploadFileToCloudinary(files.shopImages[0], CLOUDINARY_FOLDERS.shopImages),
//       safeUploadFileToCloudinary(files.gstImages[0], CLOUDINARY_FOLDERS.gstImages),
//       safeUploadFileToCloudinary(files.panCard[0], CLOUDINARY_FOLDERS.panCards),
//       safeUploadFileToCloudinary(files.aadhaarCard[0], CLOUDINARY_FOLDERS.aadhaarCards),
//     ]);

//     const [shopImagesResult, gstImagesResult, panCardResult, aadhaarCardResult] = uploadResults;

//     // Log uploaded URLs and local paths for debugging
//     console.log("Uploaded URLs and Local Paths:", {
//       shopImages: shopImagesResult,
//       gstImages: gstImagesResult,
//       panCard: panCardResult,
//       aadhaarCard: aadhaarCardResult,
//     });

//     // Create a new partner entry
//     const newPartner = new BecomeAPartner({
//       ...req.body,
//       shopImages: shopImagesResult.url,
//       gstImages: gstImagesResult.url,
//       panCard: panCardResult.url,
//       aadhaarCard: aadhaarCardResult.url,
//     });

//     // Save the new partner record
//     await newPartner.save();

//     // Cleanup local files after successful save
//     await Promise.all([
//       safeUnlink(shopImagesResult.localPath),
//       safeUnlink(gstImagesResult.localPath),
//       safeUnlink(panCardResult.localPath),
//       safeUnlink(aadhaarCardResult.localPath),
//     ]);

//     // Return success response
//     res.status(201).json(newPartner);
//   } catch (err) {
//     console.error("Error in partner registration:", err.message);
//     res.status(500).json({ error: "Internal Server Error", details: err.message });
//   }
// };

dealersCltr.becomeAPartner = async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    // Validate and parse items
    const data = req.body;
    if (data.items && typeof data.items === "string") {
      try {
        data.items = JSON.parse(data.items);
      } catch (err) {
        return res.status(400).json({ success: false, error: "Invalid format for items field" });
      }
    }

    // Get uploaded files
    const files = req.files;
    if (!files || !files.shopImages || !files.gstImages || !files.panCard || !files.aadhaarCard) {
      return res.status(400).json({ error: "Missing required files" });
    }

    const uploadedShopImages = [];
    const uploadedGstImages = [];
    const uploadedPanCard = [];
    const uploadedAadhaarCard = [];

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const shopImagesUploads = files.shopImages.map(async (file, index) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.shopImages);
      uploadedShopImages.push(uploadResult.url);
    });

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const gstImagessUploads = files.gstImages.map(async (file, index) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.gstImages);
      uploadedGstImages.push(uploadResult.url);
    });

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const panCardUploads = files.panCard.map(async (file, index) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.panCard);
      uploadedPanCard.push(uploadResult.url);
    });

    // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
    const aadhaarCardUploads = files.aadhaarCard.map(async (file, index) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.aadhaarCard);
      uploadedAadhaarCard.push(uploadResult.url);
    });

    // Wait for all uploads to finish
    await Promise.all([...shopImagesUploads, ...gstImagessUploads, ...panCardUploads, ...aadhaarCardUploads]);

  
    

    // Log uploaded URLs and local paths for debugging
    console.log("Uploaded URLs and Local Paths:", {
      shopImages: uploadedShopImages,
      gstImages: uploadedGstImages,
      panCard: uploadedPanCard,
      aadhaarCard: uploadedAadhaarCard,
    });



    // Create a new partner entry
    const newPartner = new BecomeAPartner({
      ...req.body,
      shopImages: uploadedShopImages,
      gstImages: uploadedGstImages,
      panCard: uploadedPanCard,
      aadhaarCard: uploadedAadhaarCard,
    });

    // Save the new partner record
    await newPartner.save();

    // Cleanup local files after successful save
    await Promise.all([
      safeUnlink(uploadedShopImages.localPath),
      safeUnlink(uploadedGstImages.localPath),
      safeUnlink(uploadedPanCard.localPath),
      safeUnlink(uploadedAadhaarCard.localPath),
    ]);

    // Return success response
    res.status(201).json(newPartner);
  } catch (err) {
    console.error("Error in partner registration:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};




//fetch partner details
dealersCltr.dealerRegisterDetails = async (req, res) => {
  const userId = req.params.userId;

  try {
    const partnerDetails = await PartnerDetails.findOne({ userId: userId });
    if (partnerDetails.length === 0) {
      return res.status(404).json({ error: 'No Registered Partner found for this user' });
    }
    res.json(partnerDetails);
  } catch (err) {
    console.error("Error in fetching Registered Partner details:", err);
    res.status(500).json({ error: 'Something went wrong while fetching the Registered Partner details' });
  }
};


//All dealer list
dealersCltr.AllPartnerList = async (req, res) => {
  const { state, city } = req.query;  // Assuming state and city are passed as query parameters
  
  try {
    const allPartnerList = await AllPartnerList.find({ state: state, city: city });
    
    if (allPartnerList.length === 0) {
      return res.status(404).json({ error: "No dealer found near your city" });
    }
    
    res.json(allPartnerList);
  } catch (err) {
    console.error("Error in fetching Dealer details:", err);
    res.status(500).json({ error: 'Something went wrong while fetching the Partner details' });
  }
}


// //Search dealer by Id
// dealersCltr.searchPartner = async (req, res) => {
//   const appointmentId = req.params.appointmentId; // Capture the dealer ID from the request parameters

//   try {
//     const searchPartnerDetails = await SearchPartnerDetails.find({ appointmentId: appointmentId }); // Find partner details by ID
//     if (!searchPartnerDetails) {
//       return res.status(404).json({ error: 'No dealer found with the provided ID' });
//     }
//     res.json(searchPartnerDetails); // Return the found details
//   } catch (err) {
//     console.error("Error in fetching Dealer details:", err);
//     res.status(500).json({ error: 'Something went wrong while fetching the Partner details' });
//   }
// };




//appointment list view for dealer
dealersCltr.todaysDealerAppointments = async (req, res) => {
  const dealerId = req.params.dealerId;

  try {
    // Fetch appointments for today
    const todaysAppointmentBooking = await TodaysDealerAppointment.find({ dealerId: dealerId });
    
    // Check if appointments were found
    if (todaysAppointmentBooking.length === 0) {
      return res.status(404).json({ error: 'No appointments found for today' });
    }

    // Return the found appointments
    res.json(todaysAppointmentBooking);
    
  } catch (err) {
    console.error("Error in fetching appointments:", err);
    res.status(500).json({ error: 'Something went wrong while fetching the appointments' });
  }
};



////////////new       wwwwwwwwwwwwwwwwwwwwwwwww


//  Fetch all vehicles for admin 

dealersCltr.getVehicleByNumber = async (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;
  try {
      const vehicles = await Vehicle.findOne({ vehicleNumber: vehicleNumber });
      if (vehicles.length === 0) {
          return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicles);
  } catch (err) {
      console.error("Error in fetching vehicle:", err);
      res.status(500).json({ error: 'Something went wrong while fetching the vehicle' });
  }
};



// Vehicle service register
// dealersCltr.vehicleServiceRegister = async (req, res) => {
//   try {
//     // Validate the request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Get uploaded files
//     const files = req.files;
//     if (!files || !files.vehicleServiceImages ) {
//       return res.status(400).json({ error: 'Missing required files' });
//     }

//     // Upload each file to Cloudinary and log the local path
//     const vehicleServiceImagesResult = await uploadFileToCloudinary(files.vehicleServiceImages[0], "shop-images");
    
//     // Log uploaded URLs and local paths for debugging
//     console.log("Uploaded URLs and Local Paths:", {
//       vehicleServiceImages: vehicleServiceImagesResult,
      
//     });
//     // Create a new partner entry with the uploaded URLs and request body
//     const newPartner = new BecomeAPartner({
//       ...req.body,
//       vehicleServiceImages: vehicleServiceImagesResult.url,
      
//     });
//     // Save the new partner record
//     await newPartner.save();

//     // Delete temporary files from local `uploads` folder after successful save
//     await fs.promises.unlink(vehicleServiceImagesResult.localPath);

//     res.status(201).json(newPartner);
//   } catch (err) {
//     console.error("Error while saving service  details:", err);
//     res.status(500).json({ error: 'Something went wrong while saving service  details' });
//   }
// };



// dealersCltr.vehicleServiceRegister = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       console.log("Validation errors:", errors.array());
//       return res.status(400).json({ errors: errors.array() });
//   }

//   const body = req.body;
//   console.log("Request body:", body);

//   try {
//       // Check if the mobile number and vehicle number are already registered
//       const existingRecord = await Vehicle.findOne({ vehicleNumber: body.vehicleNumber, mobile: body.mobile });
//       if (existingRecord) {
//           if (existingRecord.userName === body.userName && existingRecord.mobile === body.mobile && existingRecord.vehicleNumber === body.vehicleNumber) {
              
//               // Save new service record as it's a duplicate but allowed based on user details matching
//               const newServiceRecord = new vehicleService(body);
//               await newServiceRecord.save();
//               console.log("Duplicate vehicle number found. Saved as a new service record.");

//               // Update the vehicle's odometer reading
//               await Vehicle.findOneAndUpdate(
//                   { vehicleNumber: body.vehicleNumber },
//                   { odometer: body.odometer },
//                   { new: true }
//               );
//               console.log("Vehicle odometer updated successfully.");
              
//               return res.status(201).json(newServiceRecord);
//           } else {
//               console.log("Mobile number registered with different details.");
//               return res.status(400).json({ error: 'Mobile Number is already registered with different user details' });
//           }
//       } else {
//           // Save service record as a new entry
//           const newServiceRecord = new vehicleService(body);
//           await newServiceRecord.save();
//           console.log("New service record saved successfully.");

//           // Update the vehicle's odometer reading
//           await VehicleRegister.findOneAndUpdate(
//               { vehicle_id: body._id },
//               { odometer: body.odometer },
//               { new: true }
//           );
//           console.log("Vehicle odometer updated successfully.");
          
//           return res.status(201).json(newServiceRecord);
//       }
//   } catch (err) {
//       console.error("Error in registering vehicle service:", err);
//       res.status(500).json({ error: 'Something went wrong while registering the vehicle service' });
//   }
// };








// dealersCltr.vehicleService = async (req, res) => {
//   // Validate request
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log("Validation errors:", errors.array());
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { vehicleNumber, mobile, userName } = req.body;
//   console.log("Request body:", req.body);

//   try {
//     // Check if there's an existing record with the same vehicle number and mobile
//     const existingRecord = await VehicleService.findOne({ vehicleNumber, mobile });


//     // Get uploaded files
//     const files = req.files;
//     if (!files || !files.servicePartsImage ) {
//       return res.status(400).json({ error: 'Missing required files' });
//     }

//     // Upload each file to Cloudinary and log the local path
//     const servicePartsImageResult = await uploadFileToCloudinary(files.servicePartsImage[0], "service-parts-image");
    

//     // Log uploaded URLs and local paths for debugging
//     console.log("Uploaded URLs and Local Paths:", {
//       servicePartsImage: servicePartsImageResult
//     });



//     // Create a new partner entry with the uploaded URLs and request body
//     const newBody = new VehicleService({
//       ...req.body,
//       servicePartsImage: servicePartsImageResult.url
      
//     });


//     // If an exact match exists for username, vehicleNumber, and mobile
//     if (
//       existingRecord &&
//       existingRecord.userName === userName &&
//       existingRecord.mobile === mobile &&
//       existingRecord.vehicleNumber === vehicleNumber
//     ) {
//       // Create a new service record even if it’s a duplicate
//       const newServiceRecord = new VehicleService(req.newBody);
//       await newServiceRecord.save();
//       console.log(" vehicle found, saved as a new service record.");
//       return res.status(200).json({ message: "Service record created successfully (duplicate vehicle allowed)." });
//     }

//     // If no exact match, create a new vehicle record
//     const newVehicleRecord = new Vehicle(req.newBody);
//     await newVehicleRecord.save();

//     // Delete temporary files from local `uploads` folder after successful save
//     await fs.promises.unlink(servicePartsImageResult.localPath);


//     console.log("New vehicle and service record created successfully.");
//     return res.status(201).json({ message: "New vehicle and service record created successfully." });

//   } catch (error) {
//     console.error("Error in creating service record:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };









// Vehicle service List of vehicle
dealersCltr.vehicleServiceList = async (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;
  
  try {
      
      const vehicleServices = await VehicleService.find({ vehicleNumber: vehicleNumber });

      if (vehicleServices.length === 0) {
          return res.status(404).json({ error: "Vehicle service details not found" });
      }

      res.json(vehicleServices); 
  } catch (error) {
      console.error('Error fetching vehicle service details:', error);
      res.status(500).json({ error: 'Server error' });
  }
};


// Dealer service history of a vehicle by vehicleNumber
dealersCltr.vehicleServiceHistory = async (req, res) => {
  const { vehicleNumber } = req.params;  // Extract vehicle number from request params

  try {
    const vehicleServices = await VehicleService.find({ vehicleNumber });
    if (!vehicleServices.length) {
      return res.status(404).json({ error: "Vehicle service details not found" });
    }
    res.json(vehicleServices); 
  } catch (error) {
    console.error('Error fetching vehicle service details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

//list all est invoice for approval reject
dealersCltr.priliminaryEsApprovalRejectByUser = async (req, res) => {
  const { userId } = req.params;  // Extract vehicle number from request params

  try {
    const vehicleServices = await VehicleService.find({ userId });
    if (!vehicleServices.length) {
      return res.status(404).json({ error: "Vehicle service details not found" });
    }
    res.json(vehicleServices); 
  } catch (error) {
    console.error('Error fetching vehicle service details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

//accept or reject after customer action  updatee    working properly 
dealersCltr.EstApprovalRejectByUser = async (req, res) => {
  const estimationId = req.params.estimationId; // Corrected to match the route parameter
  const updatedData = req.body;

  try {
    // Validate the estimation ID
    if (!mongoose.Types.ObjectId.isValid(estimationId)) {
      console.log('Invalid estimation ID:', estimationId);
      return res.status(400).json({ error: 'Invalid estimation ID' });
    }

    // Find the estimation by ID and update it
    const estimation = await Estimation.findByIdAndUpdate(
      estimationId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    // Check if the estimation exists
    if (!estimation) {
      return res.status(404).json({ error: 'Estimation not found' });
    }

    // Success response
    res.status(200).json({ message: 'Estimation updated successfully', estimation });
  } catch (err) {
    console.error('Error updating estimation:', err);
    res.status(500).json({ error: 'Server error while updating estimation' });
  }
};


// dealersCltr.EstApprovalRejectByUser = async (req, res) => {
//   try {
//     const { estimationId } = req.params;
    
//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(estimationId)) {
//       console.log("estid", estimationId);
//       return res.status(400).send('Invalid ID format.');
//     }

//     const { newItem, newVehicleServiceEstimationImages
//       , newCapturedImages } = req.body;
//     const updateData = {};
//     // console.log("619",newItem)

//     // Add new items to the list of items (supporting multiple items)
    // if (newItem && Array.isArray(newItem)) {
    //   updateData.$push = {
    //     items: { $each: newItem }
    //   };
    // } else if (newItem) {
    //   updateData.$push = {
    //     items: {
    //       estimationId: new mongoose.Types.ObjectId(),
    //       ...newItem
    //     }
    //   };
    // }

//     // Add new estimation images
//     if (newVehicleServiceEstimationImages) {
//       updateData.$push = updateData.$push || {};
//       updateData.$push.vehicleServiceEstimationImages = { $each: newVehicleServiceEstimationImages };
//     }

//     // Add new captured images
//     if (newCapturedImages) {
//       updateData.$push = updateData.$push || {};
//       updateData.$push.capturedImages = { $each: newCapturedImages };
//     }

//     // Update the document in MongoDB
//     const updatedService = await Estimation.findByIdAndUpdate(
//       estimationId,
//       // updateData,
//       // newItem,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     // Check if the service document was found and updated
//     if (!updatedService) {
//       return res.status(404).send('Service entry not found.');
//     }

//     // Calculate the totalAmount based on the items array (sum of MRP)
//     let totalAmount = 0;
//     updatedService.items.forEach(item => {
//       totalAmount += item.mrp * item.quantity; // MRP * quantity for each item
//     });

//     // Update the totalAmount in the document
//     updatedService.totalAmount = totalAmount;

//     // Save the updated service entry with the new totalAmount
//     await updatedService.save();

//     // Return the updated service
//     res.status(200).json({ message: 'Service updated successfully', updatedService });

//   } catch (error) {
//     console.error('Error updating service:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

dealersCltr.EstDismantelingProcess = async (req, res) => {
  
  try {
    const { estimationId } = req.params;
    const files = req.files;
    const uploadedVehicleServiceEstimationImages = [];
    const uploadedCapturedImages = [];
    const items =  req.body.items
    console.log("estID ",estimationId )
  console.log("722",items)

    // Upload files concurrently to Cloudinary
    const vehicleServiceEstimationImagesUploads = files.vehicleServiceEstimationImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.vehicleServiceEstimationImages);
      uploadedVehicleServiceEstimationImages.push(uploadResult.url);
    });

    const capturedImagesUploads = files.capturedImages.map(async (file) => {
      const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.capturedImages);
      uploadedCapturedImages.push(uploadResult.url);
    });

    await Promise.all([...vehicleServiceEstimationImagesUploads, ...capturedImagesUploads]);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(estimationId)) {
      console.log("Invalid estimation ID:", estimationId);
      return res.status(400).send('Invalid ID format.');
    }

    const { newItem, newVehicleServiceEstimationImages, newCapturedImages } = req.body;
    const updateData = {};
    

    // Add new items to the list
    if (newItem && Array.isArray(newItem)) {
      updateData.$push = {
        items: { $each: newItem }
      };
    } else if (newItem) {
      updateData.$push = {
        items: {
          estimationId: new mongoose.Types.ObjectId(),
          ...newItem
        }
      };
    }

    // Add new estimation and captured images
    if (newVehicleServiceEstimationImages || uploadedVehicleServiceEstimationImages.length) {
      updateData.$push = updateData.$push || {};
      updateData.$push.vehicleServiceEstimationImages = { $each: newVehicleServiceEstimationImages || uploadedVehicleServiceEstimationImages };
    }
    if (newCapturedImages || uploadedCapturedImages.length) {
      updateData.$push = updateData.$push || {};
      updateData.$push.capturedImages = { $each: newCapturedImages || uploadedCapturedImages };
    }

    // Update the document in MongoDB
    const updatedService = await Estimation.findByIdAndUpdate(estimationId, 
      updateData,
      //  req.body,
      { new: true, runValidators: true });

    if (!updatedService) {
      return res.status(404).send('Service entry not found.');
    }

    // Calculate totalAmount based on items
    let totalAmount = updatedService.items.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
    updatedService.totalAmount = totalAmount;

    await updatedService.save();

    console.log(updatedService)
    res.status(200).json({ message: 'Service updated successfully', updatedService });

  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).send('Internal Server Error');
  }
};


//cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc

// dealersCltr.EstApprovalRejectByUser = async (req, res) => {
//   try {
//     const { estimationId } = req.params;
//     const files = req.files;

//     // Prepare arrays to hold upload results
//     const uploadedVehicleServiceEstimationImages = [];
//     const uploadedCapturedImages = [];

//     // Upload all vehicleServiceEstimationImages files concurrently to Cloudinary
//     const vehicleServiceEstimationImagesUploads = files.vehicleServiceEstimationImages.map(async (file) => {
//       try {
//         const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.vehicleServiceEstimationImages);
//         uploadedVehicleServiceEstimationImages.push(uploadResult.url);
//       } catch (error) {
//         console.error(`Error uploading vehicleServiceEstimationImages: ${file.name}`, error);
//       }
//     });

//     // Upload all capturedImages files concurrently to Cloudinary
//     const capturedImagesUploads = files.capturedImages.map(async (file) => {
//       try {
//         const uploadResult = await safeUploadFileToCloudinary(file, CLOUDINARY_FOLDERS.capturedImages);
//         uploadedCapturedImages.push(uploadResult.url);
//       } catch (error) {
//         console.error(`Error uploading capturedImages: ${file.name}`, error);
//       }
//     });

//     // Wait for all uploads to finish
//     await Promise.all([...vehicleServiceEstimationImagesUploads, ...capturedImagesUploads]);

//     // Log uploaded URLs for debugging
//     console.log("Uploaded URLs:", {
//       vehicleServiceEstimationImages: uploadedVehicleServiceEstimationImages,
//       capturedImages: uploadedCapturedImages,
//     });

//     // Validate estimationId
//     if (!mongoose.Types.ObjectId.isValid(estimationId)) {
//       return res.status(400).send('Invalid estimation ID format.');
//     }

//     const { newItem, newVehicleServiceEstimationImages, newCapturedImages } = req.body;
//     const updateData = {};

//     // Add new items to the list of items (supporting multiple items)
//     if (newItem && Array.isArray(newItem)) {
//       updateData.$push = {
//         items: { $each: newItem }
//       };
//     } else if (newItem) {
//       updateData.$push = {
//         items: {
//           estimationId: new mongoose.Types.ObjectId(),
//           ...newItem
//         }
//       };
//     }

//     // Add new estimation images
//     if (newVehicleServiceEstimationImages) {
//       updateData.$push = updateData.$push || {};
//       updateData.$push.vehicleServiceEstimationImages = { $each: newVehicleServiceEstimationImages };
//     }

//     // Add new captured images
//     if (newCapturedImages) {
//       updateData.$push = updateData.$push || {};
//       updateData.$push.capturedImages = { $each: newCapturedImages };
//     }

//     // Perform the update operation in the Estimation model
//     const updatedService = await Estimation.findByIdAndUpdate(
//       estimationId,
//       updateData, // Applying the updates based on the provided body
//       { new: true, runValidators: true }
//     );

//     if (!updatedService) {
//       return res.status(404).send('Service entry not found.');
//     }

//     // Calculate totalAmount based on the items (MRP * quantity)
//     const totalAmount = updatedService.items.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
//     updatedService.totalAmount = totalAmount;

//     // Save the updated service entry with the new totalAmount
//     await updatedService.save();

//     res.status(200).json({ message: 'Service updated successfully', updatedService });

//   } catch (error) {
//     console.error('Error updating service:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };






// dealersCltr.AllPartnerList = async (req, res) => {
//   try {
//     const { state, city } = req.query; // or req.body, depending on how you send the data
    
//     // Filter dealers based on the state and city
//     const allPartnerList = await AllPartnerList.find({
//       state: state,
//       city: city
//     });
    
//     if (allPartnerList.length === 0) {
//       return res.status(404).json({ error: "No dealer found near your city" });
//     }
    
//     res.json(allPartnerList);
//   } catch (err) {
//     console.error("Error in fetching Dealer details:", err);
//     res.status(500).json({ error: 'Something went wrong while fetching the Partner details' });
//   }
// };





// dealersCltr.AllPartnerList = async (req, res) => {
//   try {
//     const allPartnerList = await AllPartnerList.find({state: state}&&{city:city})
//     if(allPartnerList.length === 0 ){
//       return read.status(404).json ({error: "No dealer found near your city"})
//     }
//     res.json(allPartnerList)
// }catch (err) {
//   console.error("Error in fetching Dealer details:", err);
//   res.status(500).json({ error: 'Something went wrong while fetching the Partner details' });
// }
// }



module.exports = dealersCltr
