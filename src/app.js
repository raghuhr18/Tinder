const express = require('express');

const app = express();  

app.use(("/hello"), (req, res) => {
    res.send("Hello, This is just the beginning!");
})

app.use("/", (req, res) => {
    res.send("Hello, World!");
})

app.listen(7777, () => {
  console.log('Server is running on port 3000');
});