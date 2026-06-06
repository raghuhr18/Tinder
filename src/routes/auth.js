const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { userAuth } = require('../middlewares/auth');

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userDetails = new User({ firstName, lastName, email, password: hashedPassword });
        await userDetails.save();
        res.status(201).json("userDetails saved successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

authRouter.post("/login", async(req, res) => {
    try {
        const {email, password } = req.body
        const userDetails = await User.findOne({email}); 
        if(!userDetails){
            throw new Error("Invalid email or password");
        }
        const isPasswordMatch = await userDetails.verifyPassword(password);
        if (isPasswordMatch) {
            var token = await userDetails.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 3600000), httpOnly: true
            });
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
})

authRouter.post("/logout",  async (req, res) => {
    try {
        if (!req.cookies.token) {
            throw new Error("You're not logged in ");
        }
        res.cookie("token", "", { 
            expires: new Date( Date.now())
        });
        res.status(200).send("Logout successful") 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = authRouter;