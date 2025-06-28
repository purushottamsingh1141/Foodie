const express = require("express");
const app = express();
const mongoDB = require("./db");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables from .env

mongoDB();

// ✅ Use environment PORT or fallback
const port = process.env.PORT || 5000;

// ✅ Enable CORS for frontend (local + production)
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-frontend.vercel.app"], // ✅ Replace with actual deployed frontend URL
    credentials: true,
  })
);

// ✅ JSON middleware
app.use(express.json());

// ✅ Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
