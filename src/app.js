const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async(req, res) => {
    try {
        const {email, password } = req.body
        const userDetails = await User.findOne({email});
        if(!userDetails){
            throw new Error("Invalid email or password");
        }
        const isPasswordMatch = await bcrypt.compare(password, userDetails.password);
        if (isPasswordMatch) {
            var token = await jwt.sign({ _id : userDetails._id }, "password@112233");
            res.cookie("token", token);
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.get("/profile", async (req, res) => {
    try{
        const cookie = req.cookies;
        const { token } = cookie;
            if (token) {
                const decodedMessage = await jwt.verify(token, "password@112233")
                const user = await User.findById(decodedMessage._id);
                res.status(200).send(user);
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["about", "skills", "photoURL", "firstName", "lastName", "gender"];
        
        const isAllowedUpdate = Object.keys(data).every((update) =>ALLOWED_UPDATES.includes(update));
        if(!isAllowedUpdate){
            return res.status(400).send({message: "Invalid update fields"});
        }
        if(data.skills.length > 10){
            return res.status(400).send({message: "Skills cannot be more than 10"});
        }   
        const updatedUser = await User.findByIdAndUpdate(_id = userId, data, {
            runValidators: true
        });
        if (!updatedUser) {
            res.status(404).json({ message: "No user found with the given id" });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
}})

app.get("/feed", async (req, res) => {
    // const name = req.body.email;
    try {
        const users = await User.find({ })
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the given name" });
        } else {
            res.status(200).send(users);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "No user found with the given id" });
        } else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.use("/user", async (req, res) => {
    const emailId = req.body.email;
    const userDetails = await User.findOne({ email : emailId }) 
        if (userDetails.length === 0) {
            res.status(404).json({ message: "No user found with the given email" });
        } else {
            res.status(200).json(userDetails);
        }
    });


connectDB().then(() => {   
    app.listen(7777, () => {
        console.log('Server is running on port 3000');
      });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

