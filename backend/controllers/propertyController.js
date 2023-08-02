const propertyController = require("express").Router();
const Property = require("../models/propertyModel.js");
const verifyToken = require("../middleware/verifyToken.js");

//get all
propertyController.get("/getall", async (req, res) => {
  try {
    const properties = await Property.find();
    return res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get featured
propertyController.get("/find/featured", async (req, res) => {
  try {
    const properties = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all from a specific type
propertyController.get("/find", async (req, res) => {
  try {
    // http://xyz.com?type=beach&name=xyz
    // query is always a object like {type:beach,name:xyz}
    const type = req.query.type;
    if (type) {
      const properties = await Property.find({ type }).populate(
        "currentOwner",
        "-password"
      );
      return res.status(200).json(properties);
    }
    return res.status(500) / json("No such type");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all properties from a particular type
propertyController.get("/find/type/:type1", async (req, res) => {
  try {
    const type=req.params.type1;
    // console.log(type)
    const properties = await Property.find({ type });
    // console.log(properties)
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get count of types -> {beach:4 ,mountains:6 ,....}
propertyController.get("/find/types", async (req, res) => {
  try {
    const beachTypes = await Property.countDocuments({ type: "beach" });
    const mountainTypes = await Property.countDocuments({ type: "mountain" });
    const villageTypes = await Property.countDocuments({ type: "village" });

    res.status(200).json({
      beach: beachTypes || 0,
      mountain: mountainTypes,
      village: villageTypes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get individual property
propertyController.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const property = await Property.findOne({ _id: id }).populate(
      "currentOwner",
      "-password"
    );
    if (!property) throw new Error("No such property found");
    res.status(200).send(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create an estate
propertyController.post("/", verifyToken, async (req, res) => {
  try {
    // req.user is created in the middleware with id as only key
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });
    return res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update estate
propertyController.put("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    console.log(property.currentOwner, req.user.id);
    if (property.currentOwner.toString() !== req.user.id.toString()) {
      throw new Error("You can only update your own properties");
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedProperty);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete estate
propertyController.delete("/:id", verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner !== req.user.id)
      throw new Error("You can only delete your own properties");
    else {
      await Property.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "successfully Deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = propertyController;
