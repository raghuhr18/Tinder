const express = require('express');

const app = express();  

app.use("/helloTest", (req, res, next) => {
    console.log("This is a middleware function for /helloTest route");
})
app.post(("/user"), (req, res) => {
    res.send({"firstName": "John", "lastName": "Doe"});
})



app.listen(7777, () => {
  console.log('Server is running on port 3000');
});