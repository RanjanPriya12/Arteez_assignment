const jwt = require("jsonwebtoken");
const User = require("../models/user.model");



exports.isAuthenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .send({
        Success: false,
        message: "Authorization token not found or incorrect.",
      });
  }
  let decodeData;
  try {
    decodeData = jwt.verify(token, "secretKey");
  } catch (error) {
    return res.status(400).send({ Success: false, error: error.message });
  }
  req.user = await User.findById(decodeData.user._id);
  next();
};