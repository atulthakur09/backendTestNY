const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define schema for a service
const ServiceSchema = new Schema({
  serviceName: { type: String, required: true },
  price: { type: Number, required: true },
});

// Define schema for a service category with a name and an array of services
const ServiceCategorySchema = new Schema({
  name: { type: String, required: true },
  services: [ServiceSchema],
});

// Define schema for vehicle service prices
const VehicleServicePricesSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    periodicServices: [ServiceCategorySchema],
    acServiceRepair: [ServiceCategorySchema],
    batteries: [ServiceCategorySchema],
    tyresWheelCare: [ServiceCategorySchema],
    dentingPainting: [ServiceCategorySchema],
    detailingService: [ServiceCategorySchema],
    carSpaCleaningService: [ServiceCategorySchema],
    carInspection: [ServiceCategorySchema],
    windshieldsLights: [ServiceCategorySchema],
    suspensionFitments: [ServiceCategorySchema],
    clutchBodyParts: [ServiceCategorySchema],
    insurance: [ServiceCategorySchema],
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model(
  "VehicleServicePrices",
  VehicleServicePricesSchema
);
