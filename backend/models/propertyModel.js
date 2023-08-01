const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    //later we can use the populate function to populate fields of this ref
    currentOwner: {
      type: mongoose.Types.ObjectId, //should be a mongoose object id
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      // min: 10,
    },
    type: {
      type: String,
      enum: ["beach", "mountain", "village"], //can only be from these 3 values
      required: true,
    },
    img: {
      type: String,
      default:"",
    },
    price: {
      type: Number,
      required: true,
    },
    sqmeters: {
      type: Number,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
      min: 2,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Properties", propertySchema);
