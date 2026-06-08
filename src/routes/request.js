const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const validStatuses = ["ignored", "interested"];
            if(!validStatuses.includes(status)){
                return res.status(400).json({
                    message: "Invalid Status type " + status
                })
            }
            const sameUser = fromUserId.toString() === toUserId;
            if(sameUser) {
                return res.status(400).json({
                    message: "You cannot send a connection request to yourself"
                })
            }
            const toUser = await User.findById(toUserId);
            if(!toUser) {
                return res.status(404).json({
                    message: "User not found"
                })
            }
            const existingRequest = await ConnectionRequest.findOne({
               $or: [
                    { fromUserId, toUserId },
                    {fromUserId: toUserId, toUserId: fromUserId}
               ]  
            });
            if(existingRequest) {
                return res.status(400).json({
                    message: "Connection request already exists"
                })
            }
            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status
            });
            const data = await connectionRequest.save();
            res.json({
                success: true,
                message: "Connection request sent successfully",
                data
            })
        }catch (error) {
            res.status(400).json({
                message: "Failed to send connection request",
                error: error.message
            })
        }
    })

module.exports = requestRouter;