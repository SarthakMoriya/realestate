const multer = require("multer");
const uploadController = require("express").Router();

//destination is where the iamge will be save the directory
// filename is the name of the saved image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });

//upload.single('image') is goinf to check in the req.body for the req.body.image
uploadController.post("/images", upload.single("image"), async (req, res) => {
  try {
    return res.status(200).json("FIle uploaded successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports=uploadController