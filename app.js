const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
let io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cors = require("cors");

// DB Config
require("./config/db");

// routes
const poll = require("./routes/poll");

// view engine
app.set("view engine",'ejs')

// Set public folder
app.use(express.static(path.join(__dirname, "public")));


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// exporting io
app.use('/',(req,res,next)=>{
    req.io=io
    next()
})
app.use("/", poll);



const port = 8080;

// Start server
http.listen(port, () => console.log(`Server started on port ${port}`));
