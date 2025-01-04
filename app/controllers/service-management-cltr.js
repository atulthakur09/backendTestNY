const { validationResult } = require('express-validator');

//estimation
const Vehicle = require('../models/vehicle-register-model'); 
const vehicleService = require("../models/vehicle-service-register-model")
const cloudinary = require('../../config/cloudinary');
const fs = require('node:fs');
const VehicleServiceEstimation = require("../models/vehicle-register-model")
const VehicleService = require('../models/vehicle-service-register-model');
const VehicleReceived = require('../models/service-management/vehicle-received-model');
const VehicleReceivedDetails = require('../models/service-management/vehicle-received-model')
const VehicleRegister = require("../models/vehicle-register-model")
// const vehicleService = require("../models/service-management/vehicle-service-estimation-jobcard-model")

const serviceManagementCltr = {};


// Utility function to upload files to Cloudinary
const uploadFileToCloudinary = async (file, folderName) => {
    const mimeType = file.mimetype.split("/").at(-1); // Get file extension
    const fileName = file.filename; // Get the filename generated by multer
    const filePath = path.resolve(__dirname, "../../uploads", fileName); // Get full path
  
    // Log the local file path
    console.log(`Local file path for ${fileName}: ${filePath}`);
  
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: folderName,
      format: mimeType,
    });
  
    return {
      url: uploadResult.secure_url, // Cloudinary URL
      localPath: filePath // Local file path
    };
  };



//vehicle received at dealer
serviceManagementCltr.vehicleReceived = async (req, res) => {
    try {
        const {partnerId, vehicleNumber, date,time, ownerName, receiverName, comment } = req.body;
  
        // Create and save new record
        const newEntry = new VehicleReceived({
          partnerId,
          vehicleNumber,
          date,
          time,
          ownerName,
          receiverName,
          comment,
        });
  
        await newEntry.save();
  
        res.status(201).json({ message: 'Vehicle received info saved successfully', data: newEntry });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving vehicle info', error });
      }
  
    }

    

//fetch partner vehicle received
serviceManagementCltr.vehicleReceivedDetails = async (req, res) => {
    const partnerId = req.params.partnerId; 
  
    try {
        const vehicleReceivedDetails = await VehicleReceived.find({ partnerId: partnerId });
        if (vehicleReceivedDetails.length === 0) {
            return res.status(404).json({ error: 'No vehicles received for your workshop.' });
        }
        res.status(200).json(vehicleReceivedDetails);
    } catch (err) {
        console.error("Error in fetching vehicle received details:", err);
        res.status(500).json({ error: 'Something went wrong while fetching the vehicle received details. Please try again later.' });
    }
};


//estimated job card
serviceManagementCltr.vehicleServiceEstimation = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log("Validation errors:", errors.array());
    //     return res.status(400).json({ errors: errors.array() });
    // }

    // const body = req.body;
    // console.log("Request body:", body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ errors: errors.array() });
          }

        const files= req.files
        console.log("line 104",file)
        if(!files || !files.vehicleServiceEstimationImages || !files.capturedImage){
            return res.status(400).json ({error:"Image file require"})
        }
        // Upload each file to Cloudinary and log the local path
    const vehicleServiceEstimationImagesResult = await uploadFileToCloudinary(files.vehicleServiceEstimationImages[0], "vehicle-service-estimation-images");
    const capturedImageResult = await uploadFileToCloudinary(files.capturedImage[0], "captured-image");
    
    // Log uploaded URLs and local paths for debugging
    console.log("Uploaded URLs and Local Paths:", {
        vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult,
        capturedImage: capturedImageResult,
      });
      const newEstimation = new VehicleServiceEstimation ({
        ...req.body, 
        vehicleServiceEstimationImages: vehicleServiceEstimationImagesResult.url,
        capturedImage: capturedImageResult.url,
      })
       await newEstimation.save()

       
    // Delete temporary files from local `uploads` folder after successful save
    await fs.promises.unlink(vehicleServiceEstimationImagesResult.localPath);
    await fs.promises.unlink(capturedImageResult.localPath);

    res.status(201).json(newPartner);
    }
    catch{err}
{
    console.log("error in creating estimation")
    res.status(500).json({ error: 'Something went wrong while registering new partner' });
}
}






// customer section   ----------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxx------------------------------------------

serviceManagementCltr.customerVehicleReceivedDetails = async (req, res) => {
  const vehicleNumber = req.params.vehicleNumber;
    try {
        const vehicleReceiving = await VehicleReceived.find({ vehicleNumber: vehicleNumber });
        
        if (vehicleReceiving.length === 0) {
            return res.status(404).json({ error: 'No appointment found for this user' });
        }
        
        res.json(vehicleReceiving);
    } catch (err) {
        console.error("Error in fetching vehicleReceiving:", err);
        res.status(500).json({ error: 'Something went wrong while fetching the vehicleReceiving' });
    }
};

//priliminary estimation approval display for customer
serviceManagementCltr.priliminaryEstimationApprovalReject = async (req, res) => {
  const { partnerId } = req.params;  // Extract vehicle number from request params

  try {
    const vehicleServices = await VehicleService.find({ partnerId });
    if (!vehicleServices.length) {
      return res.status(404).json({ error: "Vehicle service details not found" });
    }
    res.json(vehicleServices); 
  } catch (error) {
    console.error('Error fetching vehicle service details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};





module.exports = serviceManagementCltr