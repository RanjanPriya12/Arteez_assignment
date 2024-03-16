const { default: mongoose } = require("mongoose");
const Book = require("../models/book.model");
const UserBookIssued = require("../models/user-issued-book.model");

exports.addBook = async (req, res) => {
    try {
        let book = await Book.findOne({ title: req.body.title });
        if (book) {
            const updatedBook = await Book.updateOne({ _id: book._id }, { $set: { quantity: book.quantity + req.body.quantity } });
            return res
                .status(200)
                .send({ Success: false, message: "Book already exists", book: updatedBook });
        } else {
            book = await Book.create(req.body);
            return res.status(201).send({
                Success: true,
                message: "Book created successfully",
                book: book
            });
        }
    } catch (error) {
        return res.status(500).send({ errors: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        if (!books) {
            return res.status(401).send({ Success: false, message: "Unable to fetch books" });
        }
        return res.status(200).send({ Success: true, message: "Books found", books: books });
    } catch (error) {
        return res.status(500).send({ Success: false, error: error.message });
    }
}

exports.issueBook = async (req, res) => {
    try {
        const book = await UserBookIssued.findOne({ bookId: req.params.bookId, userId: req.params.userId });
        if (book) {
            return res.status(200).send({ Success: false, message: "Book is already issued for this user", book: book });
        }
        else {
            const bookForIuuse = await Book.findById({ _id: req.params.bookId });
            if (bookForIuuse && bookForIuuse.quantity>=1) {
                await Book.updateOne({ _id: bookForIuuse._id }, { $set: { quantity: bookForIuuse.quantity - 1 } });
                const bookId =new mongoose.Types.ObjectId(req.params.bookId);
                const userId =new mongoose.Types.ObjectId(req.params.userId);
                await UserBookIssued.create({ bookId: bookId, userId: userId });
                return res.status(200).send({ Success: true, message: "Book issued", book: bookForIuuse.title });
            }
            else {
                return res.status(200).send({ Success: false, message: "This book is no more available in the library" });
            }
        }
    } catch (error) {
        return res.status(500).send({ errors: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const book = await Book.findById({ _id: req.params.bookId });
        if (!book) {
            return res.status(200).send({ Success: false, message: "This Book is not found in the library"});  
        }
        const bookForReturn = await UserBookIssued.findOne({ bookId: req.params.bookId, userId: req.params.userId });
        if (!bookForReturn && book) {
            return res.status(200).send({ Success: false, message: "Book was not issued to this user", book: book.title });
        }
        if (bookForReturn && book) {
            const updatedBook = await Book.updateOne({ _id: book._id }, { $set: { quantity: book.quantity + 1 } });
            await UserBookIssued.findByIdAndDelete({ _id: bookForReturn._id });
            return res.status(200).send({ Success: true, message: "Book returned", book: updatedBook.title });
        }
        else {
            return res.status(200).send({ Success: false, message: "Book not found" });
        }

    } catch (error) {
        return res.status(500).send({ errors: error.message });
    }
};

exports.findBooksIssuedToUser = async (req, res) => {
    try {
        const issuedBooks = await UserBookIssued.aggregate([
            {
                $match: {
                    userId:new mongoose.Types.ObjectId(req.params.userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $project: {
                    _id: 0,
                    bookName: { $arrayElemAt: ["$bookInfo.title", 0] },
                    userName: { $arrayElemAt: ["$userInfo.username", 0] }
                }
            }
        ]);

        if (issuedBooks.length < 0) {
            return res.status(401).send({ Success: false, message: "No book issued to this user"});  
        }
        return res.status(200).send({ Success: true, message: "All Books list issued to this user",books:issuedBooks});  
    } catch (error) {
        return res.status(500).send({ Success: false, error:error.message});  
    }
}





