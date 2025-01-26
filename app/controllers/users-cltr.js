const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersCltr = {};

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

module.exports = usersCltr;
