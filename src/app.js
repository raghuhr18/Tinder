const express = require('express');
const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');

app.use("/getUserData", (req, res) => {
    throw new Error("kjhkjjkh");
}),

app.use( "/", (err, req, res, next) => {
    if(err){
        res.status(500).send('Something broke!');
    }

}),

app.use("/admin", adminAuth);

app.use("/admin", (req, res) => {
    res.send("User data for admin");
});

app.get("/admin/getDashboardData", (req, res) => {
    res.send("Dashboard data for admin");
});

app.get("/user", userAuth, (req, res) => {
    res.send("User data for user");
});

app.listen(7777, () => {
  console.log('Server is running on port 3000');
});