const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth');
const cors = require('cors')


app.use(cors);
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {   
    app.listen(7777, () => {
        console.log('Server is running on port 3000');
      });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

