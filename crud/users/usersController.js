
const db = require("../../models");
const User = db.User;    
    
    
exports.index = async (req, res, next) => {

    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var offset = (page - 1) * limit;
    
    try{
        const users = await User.findAndCountAll({
            offset: +offset,
            limit: +limit
        });

        return res.status(200).send({ message: "OK", status: 1, data: users });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
    
};
    
exports.show = async (req, res, next) => {
    var id = req.params.id | 0;

    try{
        const users = await User.findAll({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "OK", status: 1, data: users });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.create = async (req, res, next) => {

    try{
        const users = await User.create(req.body);
        return res.status(200).send({ message: "users created successfully.", status: 1, data: users });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.update = async (req, res, next) => {

    var id = req.params.id;
    try{
        const users = await User.update(req.body, {
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "users updated successfully.", status: 1, data: users });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.delete = async (req, res, next) => {

    var id = req.params.id;
    try{
        const users = await User.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "users deleted successfully.", status: 1 });
    }catch(error){
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}