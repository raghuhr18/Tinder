const express = require('express');
const profileRouter = express.Router();

const { userAuth } =  require('../middlewares/auth')

profileRouter.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = profileRouter;