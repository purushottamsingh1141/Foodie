const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/foodData", async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection("fooditem")
      .find({})
      .toArray();
    const foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    res.send([foodItems, foodCategory]);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
