function toUpper(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(function (word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
}

exports.controllerTemplate = function (name) {
    const modelName = toUpper(name).substring(0, name.length - 1);
    const modelName1 = name.substring(0, name.length - 1);

    return `
const db = require("../../models");
const ${modelName} = db.${modelName};    
    
    
exports.index = async (req, res, next) => {

    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var offset = (page - 1) * limit;
    
    try{
        const ${name} = await ${modelName}.findAndCountAll({
            offset: +offset,
            limit: +limit
        });

        return res.status(200).send({ message: "OK", status: 1, data: ${name} });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
    
};
    
exports.show = async (req, res, next) => {
    var id = req.params.id | 0;

    try{
        const ${name} = await ${modelName}.findAll({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "OK", status: 1, data: ${name} });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.create = async (req, res, next) => {

    try{
        const ${name} = await ${modelName}.create(req.body);
        return res.status(200).send({ message: "${name} created successfully.", status: 1, data: ${name} });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.update = async (req, res, next) => {

    var id = req.params.id;
    try{
        const ${name} = await ${modelName}.update(req.body, {
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "${name} updated successfully.", status: 1, data: ${name} });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.delete = async (req, res, next) => {

    var id = req.params.id;
    try{
        const ${name} = await ${modelName}.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "${name} deleted successfully.", status: 1 });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}`;
};

exports.routeTemplate = function (name) {
    return `
    
module.exports = function(app) {

    const ${name}Controller = require("./${name}Controller.js");
    
    app.get(
        "/api/${name}",
        ${name}Controller.index
    );
    app.get(
        "/api/${name}/:id",
        ${name}Controller.show
    );
    app.post(
        "/api/${name}",
        ${name}Controller.create
    );
    app.put(
        "/api/${name}/:id",
        ${name}Controller.update
    );
    app.delete(
        "/api/${name}/:id",
        ${name}Controller.delete
    );
}`;
}

exports.mainRouteTemplate = function (name) {
    return `
    
module.exports = function(app) {

    
}`;
}

exports.indexTemplate = function () {
    return `
    var express = require("express");
var cors = require("cors");
var app = express();
const helmet = require('helmet');
app.use(helmet())
app.use(cors());
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
app.use(bodyParser.json());
app.use(express.static("images"));
require("./router/router.js")(app);

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
        console.log({ err: "Server error " + err" });
    }
});
    `
}

