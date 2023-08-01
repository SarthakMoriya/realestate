const authController = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel.js");

//SIGNUP
authController.post("/signup", async (req, res) => {
  try {
    //checking the email
    const user = await Users.findOne({ email: req.body.email });

    if (user) throw new Error("Email already registered!");

    //create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await Users.create({
      ...req.body,
      password: hashedPassword,
    });
    //   console.log(newUser);
    const { password, ...others } = newUser._doc;
    //assign token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.status(200).json({ message: "success", others, token });
  } catch (error) {
    res.status(500).status(500).json({ message: error.message });
  }
});

//LOGIN
authController.post("/login", async (req, res) => {
  try {
    //checking the email
    const user = await Users.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Credentials!");

    //checking passwords
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) throw new Error("Invalid Credentials!");

    //create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    const { password1, ...others } = user._doc;
    res.status(200).json({ message: "success", others, token });
  } catch (error) {
    res.status(500).status(500).json({ message: "lodaa mera" });
  }
});

module.exports = authController;
