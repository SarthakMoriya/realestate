const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({ message: "Invalid authorization" });

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    //verify token
    jwt.verify(token,process.env.JWT_SECRET, (err, data) => {
      if (err) res.status(403).json("Invalid or Expired Session!");
      else {
        //we use user._id while creating login user as paramneter which
        //is returned in data variable
        req.user = data; //data ===  user._id which is avaialbe same as req.body we'll have req.user for all controllers using this middleware
        next();
      }
    });
  }
};

module.exports = verifyToken;
