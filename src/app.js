const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');


app.post("/users", async (req, res) => {
const userDetails = new User({
    firstName: "Akash",
    lastName: "Kumar",
    email: "akshay@kumar.com",
    password: "123456",
    gender: "Male",
});
try {
    await userDetails.save();
    res.status(201).json(userDetails);
    }catch (error) {
    res.status(400).json({ message: error.message }); 
}  
})
connectDB().then(() => {   
    app.listen(7777, () => {
        console.log('Server is running on port 3000');
      });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

