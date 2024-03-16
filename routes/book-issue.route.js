const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const { issueBook, returnBook } = require("../controllers/books.controller");
const router = express.Router();

router.route("/borrow/:bookId/:userId").get(isAuthenticate, issueBook);
router.route("/return/:bookId/:userId").get(isAuthenticate, returnBook);

module.exports=router;