const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "MySuperSecretJWTKey123@!#$"; // Replace with process.env.JWT_SECRET in production

// ===============================
// ✅ Create User (Sign Up)
// ===============================
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
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ errors: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });

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

// ===============================
// ✅ Login User
// ===============================
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

      const isMatch = bcrypt.compareSync(req.body.password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      const payload = { user: { id: userData._id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, errors: "Server error" });
    }
  }
);

// ===============================
// ✅ Update User Info
// ===============================
router.put(
  "/updateuser",
  [
    body("name").optional().isLength({ min: 3 }),
    body("location").optional().isLength({ min: 2 }),
    body("password").optional().isLength({ min: 5 }),
    body("email", "Invalid email").isEmail(), // required for identifying the user
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
      const updates = {};

      if (req.body.name) updates.name = req.body.name;
      if (req.body.location) updates.location = req.body.location;
      if (req.body.password) {
        updates.password = bcrypt.hashSync(req.body.password, 10);
      }

      const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, errors: "User not found" });
      }

      res.json({
        success: true,
        message: "User updated successfully",
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          location: updatedUser.location,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, errors: "Server error" });
    }
  }
);

module.exports = router;
