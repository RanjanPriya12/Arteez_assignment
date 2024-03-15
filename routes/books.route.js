const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const { bookCreationValidation } = require("../validations/book.validation");
const { addBook,getAllBooks } = require("../controllers/books.controller");
const router = express.Router();

router.route("/").post(bookCreationValidation, isAuthenticate, addBook);
router.route("/").get(isAuthenticate, getAllBooks);

module.exports=router;