const express = require("express");
const app = express();
const mongoDB = require("./db");
const cors = require("cors");
require("dotenv").config();

// Connect to MongoDB
mongoDB();

// Use environment PORT or fallback
const port = process.env.PORT || 5000;

// Enable CORS for localhost frontend (React)
app.use(
  cors({
    origin: ["https://foodie-g41l.onrender.com/", "https://foodie-oppwd772a-purushottam-singhs-projects.vercel.app/"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
console.log("👉 Loading CreateUser route...");
app.use("/api", require("./Routes/CreateUser"));

console.log("👉 Loading DisplayData route...");
app.use("/api", require("./Routes/DisplayData"));

// Root route
app.get("/", (req, res) => {
  res.send("Hello from backend (localhost)!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
