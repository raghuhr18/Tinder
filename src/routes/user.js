const express = require('express');
const userRouter = express.Router();

// const User = require('../models/user');
const { userAuth } = require('../middlewares/auth');
const connectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user');

const USER_SAFE_DATA = "firstName lastName photoURL about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const name = req.user.firstName + " " + req.user.lastName;
        console.log("UserName, UserId", name, userId);
        const connectionRequests = await connectionRequestModel.find({
            toUserId: userId,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA); // ✅ fixed
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
        }).populate("fromUserId", "firstName lastName photoURL about skills")
        .populate("toUserId", "firstName lastName photoURL about skills")
        const formattedConnections = connections.map(connection => {
            if(connection.fromUserId._id.toString() === userId.toString()) {
                return connection.toUserId;
            }return connection.fromUserId;
        })
        res.json({
            success: true,
            message: "Connections fetched successfully",
            data: formattedConnections
        })
    }catch (error) {
        console.log("FULL ERROR:", error); // add this
        res.status(400).json({
            message: "Failed to fetch connections",
            error: error.message
        })
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = ( page - 1 ) * limit;
        console.log("here it is - " + page, limit, skip); 

        const connections = await connectionRequestModel.find({
            $or: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connections.forEach((connection) => {
            hideUsersFromFeed.add(connection.fromUserId.toString());
            hideUsersFromFeed.add(connection.toUserId.toString());
        })
        const users = await User.find({
            $and : [      
             {_id: { $nin: Array.from(hideUsersFromFeed) }},
             {_id: { $ne: userId }}
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({
            success: true,
            message: "Feed fetched successfully",
            data: users
        })
    }catch (error) {
        res.status(400).json({
            message: "Failed to fetch feed",
            error: error.message
        })
    }
})
module.exports = userRouter;