const express = require('express');
const profileRouter = express.Router();

const { userAuth } =  require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.status(200).send(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => { 
    try{
        validateEditProfileData(req); 
        if(!validateEditProfileData) {
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        })
        await loggedInUser.save();
        res.status(200).json({ message: loggedInUser.firstName + "Profile updated successfully", user: loggedInUser });
        }catch (error) {   
        res.status(400).json({ message: error.message });
    }
})

module.exports = profileRouter;