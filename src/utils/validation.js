const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("FirstName and LastNAme are required")
    } else if (!email || !validator.isEmail(email)) {
        throw new Error("Valid email is required")
    } else if (!password || password.length < 6) {
        throw new Error("Please enter a strong Password")
    }
}

module.exports = {
    validateSignUpData
}