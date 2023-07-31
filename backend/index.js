const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const authController = require("./controllers/authController.js");
const propertyController = require("./controllers/propertyController.js");
const uploadController = require("./controllers/uploadController.js");

const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images',express.static('public/images'))
// http://localhost:5000/images/

app.use("/auth", authController);
app.use("/property", propertyController);
app.use('/upload', uploadController);

//connecting DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION_URL).then(function (connection) {
  console.log("DB Connected");
});

//starting server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
