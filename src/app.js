const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');


app.use(express.json());

app.post("/signup", async (req, res) => {
const userDetails = new User(req.body);
try {
    await userDetails.save();
    res.status(201).json("userDetails saved successfully");
    }catch (error) {
    res.status(400).json({ message: error.message }); 
}  
}
)
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
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
    console.log(id);
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

