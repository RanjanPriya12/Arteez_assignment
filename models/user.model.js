const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", function (next) {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compareSync(password, this.password);
    } catch (error) {
        console.log("error", error)
    }
};
const User = mongoose.model('User', userSchema);

module.exports = User;
