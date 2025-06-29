const express = require("express");
const app = express();
const mongoDB = require("./db");
const cors = require("cors");
require("dotenv").config();

mongoDB();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodie-ezvd7ha1q-purushottam-singhs-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

// ✅ Corrected lowercase route imports
app.use("/api", require("./routess/CreateUser"));
app.use("/api", require("./routess/DisplayData"));

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
