const express = require('express');
const app = express();
const itemRoute = require("./routes/items");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv/config');


//middleware
app.use(bodyParser.json());
app.use("/items", itemRoute);

app.get("/discount/all", (req, res) => {
    res.send("hello")
})

//connect to mongodb
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("connected to DB")
});


//listen to server port
app.listen(3000)