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
const corsOptions = {
  origin:["https://foodie-oppwd772a-purushottam-singhs-projects.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
 };

app.use(cors(corsOptions));

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
