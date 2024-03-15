const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const { issueBook } = require("../controllers/books.controller");
const router = express.Router();

router.route("/borrow/:bookId/:userId").get(isAuthenticate, issueBook);

module.exports=router;