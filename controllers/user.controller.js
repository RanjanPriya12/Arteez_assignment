const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

exports.register = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.emil });
      if (user) {
        return res
          .status(400)
          .send({ Success: false, message: "User already exists" });
      } else {
        user = await User.create(req.body);        
        return res.status(201).send({
          Success: true,
          message: "Account created successfully",
          user
        });
      }
    } catch (error) {
      return res.status(500).send({ errors: error.message });
    }
};
  

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please Enter Your Email and Password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Incorrect email or password" });
    } else {
      const match = await user.comparePassword(password);
      if (!match) {
        return res.status(400).send({ message: "Incorrect email or password" });
      } else {
        const token = jwt.sign({ user }, "secretKey");
        res.setHeader("Set-Cookie", cookie.serialize("Token",token, {
          httpOnly: true,
          maxAge: new Date(
            Date.now() + 1 * 24 * 60 * 60 * 1000
          )
        }));
        return res.status(200).send({
          Success: true,
          message: "User login successfully",
          user
        });
      }
    }
};





  