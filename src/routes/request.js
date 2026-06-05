const express = require('express');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user
    res.status(200).send(user.firstName + "  " + "sent you a connection request" );
})

module.exports = requestRouter;