const mongoose = require('mongoose');
const { Schema } = mongoose;
const validate = require('validator');

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
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;