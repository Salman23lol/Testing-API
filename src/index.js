const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { authRouter } = require("./Routes/userRoutes"); // Assuming userRoutes exports authRouter

const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

const DB_URL = process.env.DB_URL; // Assuming DB_URL is defined in your .env file

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 6000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
