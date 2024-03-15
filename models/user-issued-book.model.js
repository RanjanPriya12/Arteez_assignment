const mongoose = require('mongoose');

const bookIssuedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    bookId:{type:mongoose.Schema.ObjectId,ref:"Book",required:true},
},
{
    timestamps: true,
    versionKey: false
});

const UserBookIssued = mongoose.model('User-Book-Issued', bookIssuedSchema);

module.exports = UserBookIssued;