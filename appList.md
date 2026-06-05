# DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/view
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

useRouter
- GET user/connections
- GET user/requests
- GET user/feed





//the below code is for referance and can be used later


app.patch("/user/:userId", userAuth, async (req, res) => {
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

app.get("/feed", userAuth, async (req, res) => {
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

app.delete("/delete/:id", userAuth, async (req, res) => {
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

app.use("/user", userAuth, async (req, res) => {
const emailId = req.body.email;
const userDetails = await User.findOne({ email : emailId }) 
    if (userDetails.length === 0) {
        res.status(404).json({ message: "No user found with the given email" });
    } else {
        res.status(200).json(userDetails);
    }
});