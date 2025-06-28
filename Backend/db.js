const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB successfully!");

    const fetched_data = await mongoose.connection.db
      .collection("fooditem")
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    global.food_item = fetched_data;
    global.foodCategory = foodCategory;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
