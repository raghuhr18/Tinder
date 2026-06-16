const mongoose = require('mongoose');
const { Schema } = mongoose;
const validate = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validate.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new error
            }
        }
    },
    photoURL: {
        type: String,
        validate(value) {
            if(!validate.isURL(value)) {
                throw new Error("Invalid URL");
            }
        }
    },
    about: {
        type: String,
        default: "Hey there! This is all about the about page. You can write something about yourself here."
    },
    skills: {
        type: [String],
    },
    photoURL: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyrrTeNoPRV10pyH2NGdaZK4qhJs0qu63qDk26D8x-eQ&s"
    },
}, { timestamps: true });   

userSchema.methods.getJWT = async function() {
    const userDetails = this;
    const token = await jwt.sign({ _id : userDetails._id }, "password@112233", { expiresIn: "1h" });
    return token;
}

userSchema.methods.verifyPassword = async function(password) {
    const userDetails = this;
    const hashedPassword = userDetails.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
const User = mongoose.model('User', userSchema);

module.exports = User;