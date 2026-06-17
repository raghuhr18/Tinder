const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("FirstName and LastName are required")
    } else if (!email || !validator.isEmail(email)) {
        throw new Error("Valid email is required")
    } else if (!password || password.length < 6) {
        throw new Error("Please enter a strong Password")
    }
}

const validateEditProfileData = (req) => {
    const allowedProfileEditFields = ["firstName", "lastName", "photoURL", "about", "gender", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedProfileEditFields.includes(field)) 
    if (!isEditAllowed) {
        throw new Error("Invalid edit request" );
    }
    return isEditAllowed;
}
module.exports = {
    validateSignUpData,
    validateEditProfileData
}