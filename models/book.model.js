const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    ISBN:{ type: String, required: true},
    quantity: { type: String, required: true}
},
{
    timestamps: true,
    versionKey: false
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;