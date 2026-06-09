const express = require('express');
const userRouter = express.Router();

// const User = require('../models/user');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const name = req.user.firstName + " " + req.user.lastName;
        console.log("UserName, UserId", name, userId);
        const connectionRequests = await connectionRequestModel.find({
            toUserId: userId,
            status: "interested"
        }).populate("fromUserId", "name firstName lastName email photoURL about skills");
            res.json({
            success: true,
            message: "Connection requests fetched successfully",
            data: connectionRequests
        })
    }catch (error) {
        res.status(400).json({
            message: "Failed to fetch connection requests",
            error: error.message
        })
    }

} )


userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const connections = await connectionRequestModel.find({
            $or: [
                { fromUserId: userId, status: "accepted" },
                { toUserId: userId, status: "accepted" }
            ]
        }).populate("fromUserId toUserId", "name firstName lastName photoURL about skills");
        const formattedConnections = connections.map(connection => {
            if(connection.fromUserId._id.toString() === userId.toString()) {
                return connection.toUserId;
            }return connection.fromUserId;
        })
        res.json({
            success: true,
            message: "Connections fetched successfully",
            data: connections
        })
    }catch (error) {
        res.status(400).json({
            message: "Failed to fetch connections",
            error: error.message
        })
    }
})
module.exports = userRouter;