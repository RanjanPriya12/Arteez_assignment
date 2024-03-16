const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    ISBN:{ type: Number, required: true},
    quantity: { type: Number, required: true}
},
{
    timestamps: true,
    versionKey: false
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;