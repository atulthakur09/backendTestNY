const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


const usersCltr = {};
// dotenv.config();
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

usersCltr.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;
  try {
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(body.password, salt);

    // Create user instance
    const user = new User({
      ...body, // Spread the body to include all user properties
      password: hashPassword, // Set the hashed password
    });

    // Save the user
    await user.save();
    return res.status(201).json(user); // Return response after user creation
  } catch (err) {
    console.error("Error during registration:", err); // Log error for debugging
    return res.status(500).json({ error: "Something went wrong" }); // Send a single response in case of error
  }
};
// usersCltr.register = async (req, res) => {
//     const errors = validationResult(req)
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array()})
//     }
//     const body = req.body
//     try {
//         const salt = await bcryptjs.genSalt()
//         const hashPassword = await bcryptjs.hash(body.password, salt)
//         const user = new User(body)
//         user.password = hashPassword
//         await user.save()
//         res.status(201).json(user)
//     } catch(err) {
//         res.status(500).json({ error: 'something went wrong'})
//     }
//     User.create(body)
//         .then((user) => {
//             res.status(201).json(user)
//         })
//         .catch((err) => {
//             res.status(500).json({ error: 'something went wrong'})
//         })
// }

usersCltr.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      const isAuth = await bcryptjs.compare(body.password, user.password);
      if (isAuth) {
        const tokenData = {
          id: user._id,
          role: user.role,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.json({ token: token });
      }
      return res.status(404).json({ error: "invalid email / password " });
    }
    res.status(404).json({ error: "invalid email / password" });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
};

usersCltr.account = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
};




usersCltr.payment = async (req, res) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const saltKey = process.env.SALT_KEY;
  const merchantId = process.env.MID;

  try {
    if (!saltKey || !merchantId) {
      console.error("Missing environment variables.");
      return res.status(500).json({ message: "Server configuration error", success: false });
    }

    console.log("Received request:", req.body);

    const merchantTransactionId = req.body.transactionId;
    const data = {
      estimationId: req.body.estimationId,

      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.username,
      amount: req.body.totalAmount * 100,
      redirectUrl: `${API_BASE_URL}/status/?id=${merchantTransactionId}`,
      redirectMode: 'POST',
      mobileNumber: req.body.mobile,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    console.log("Payload:", data);

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const string = payloadMain + '/pg/v1/pay' + saltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = `${sha256}###${keyIndex}`;

    const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: 'POST',
      url: prod_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    const response = await axios.request(options);
    return res.json(response.data);
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};



const updateEstimation1 = async (estimationId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/estService/update/${estimationId}`,
      updatedData,
      
    );
    console.log("Update successful:", response.data);
  } catch (error) {
    console.error("Error updating estimation:", error);
  }
};


usersCltr.status = async (req, res) => {
  const FRONTEND_LOCALHOST_PORT = process.env.REACT_APP_API_KEY;
  const saltKey = process.env.SALT_KEY;
  const merchantId = process.env.MID;  // Corrected: fetch the merchantId from environment variables

  const merchantTransactionId = req.query.id;

  try {
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = `${sha256}###${keyIndex}`;

    const options = {
      method: 'GET',
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`,
      },
    };

    // CHECK PAYMENT STATUS
    const response = await axios.request(options);
    if (response.data.success === true) {
      const estimationId = response.data.estimationId;
      const updatedData = { paymentStatus: "Paid" };

  await updateEstimation1(estimationId, updatedData);

      const url = `${FRONTEND_LOCALHOST_PORT}/success`;
      // console.log("302",`${FRONTEND_LOCALHOST_PORT}/success`)
      return res.redirect(url);
    } else {
      const url = `${FRONTEND_LOCALHOST_PORT}/failure`;
      return res.redirect(url);
    }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = usersCltr;
