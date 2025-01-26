const { config: configDotenv } = require("dotenv");

// Load environment variables from .env file
configDotenv();

// Define configuration object
const _config = {
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
};

// Freeze the configuration object to prevent modification
const config = Object.freeze(_config);

// Export the frozen configuration object
module.exports = { config };

// const { configDotenv } = require('dotenv');
// conf();

// const _config = {

//   cloudinaryCloud: process.env.CLOUDINARY_CLOUD_NAME,
//   cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
//   cloudinarySecret: process.env.CLOUDINARY_API_SECRET,

// };

// export const config = Object.freeze(_config);
