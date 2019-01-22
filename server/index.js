const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

mongoose.connect("mongodb://localhost:/auth",
 {useNewUrlParser: true },
 function(error) {
    if (mongoose.connection.readyState == 0) 
        console.log(error);
    else if(mongoose.connection.readyState == 1)
        console.log("connection success");
 
})
// app setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({type:"*/*"}))
router(app)

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("port", port);
