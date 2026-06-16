const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    try{
        const cookie = req.cookies;
        const { token } = cookie;
        if( !token ) {
            res.status(401).send("Please Login!")
        }
        if (token) {
            const decodedMessage = jwt.verify(token, "password@112233");
            const { _id } = decodedMessage;
            const user = await User.findById(_id);
            if (!user) {
                throw new Error("No user found...!");
            }else{
                req.user = user;
                next();
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
    userAuth
}