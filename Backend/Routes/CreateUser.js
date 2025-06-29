const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MySuperSecretJWTKey123@!#$";
// Replace with process.env.JWT_SECRET in production

// 👉 Create User (Sign Up)
router.post(
  "/createuser",
  [
    body("email", "Invalid email").isEmail(),
    body("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    body("password", "Password should be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ errors: "User already exists" });
      }

      // Hash the password before saving
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });

      // Generate JWT token
      const payload = { user: { id: newUser._id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({
        success: true,
        message: "User created successfully",
        authToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, errors: "Server error" });
    }
  }
);

// 👉 Login User
router.post(
  "/loginuser",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
      const userData = await User.findOne({ email: req.body.email });

      if (!userData) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      // Compare entered password with stored hashed password
      const isMatch = bcrypt.compareSync(req.body.password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      // Generate JWT token
      const payload = { user: { id: userData._id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, errors: "Server error" });
    }
  }
);

module.exports = router;
