const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect(`mongodb+srv://NamasteDev:eN4QhvzzJvaEJIZq@namastenode.xuzlrtp.mongodb.net/devTinder`);
    };

module.exports = connectDB;
