const express = require("express");
const { register, login } = require("../controllers/user.controller");
const { isAuthenticate } = require("../middlewares/auth");
const { findBooksIssuedToUser } = require("../controllers/books.controller");
const { isValidate } = require("../validations/registration.validation");
const router = express.Router();

router.route("/register").post(isValidate, register);
router.route("/login").get(login);
router.route("/:userId/:books").get(isAuthenticate,findBooksIssuedToUser);

module.exports=router;