var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.use(bodyParser.json());
app.use(express.static("images"));
require("./router/router.js")(app);
global.__basedir = __dirname;

var port = process.env.PORT;
// Create a Server
var server = app.listen(port, function () {
    console.log("Server is running on port " + port);
});

server.on("error", err => {
    if (err.code === "EADDRINUSE") {
        setTimeout(() => {
            server.close();
            server.listen(port);
        });
    } else {
        console.log({ err: `Server error ${err}` });
    }
});