
const db = require("../../models");
const Post = db.Post;


exports.index = async (req, res, next) => {

    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var offset = (page - 1) * limit;

    try {
        const posts = await Post.findAndCountAll({
            offset: +offset,
            limit: +limit
        });

        return res.status(200).send({ message: "OK", status: 1, data: posts });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }

};

exports.show = async (req, res, next) => {
    var id = req.params.id | 0;

    try {
        const posts = await Post.findAll({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "OK", status: 1, data: posts });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.create = async (req, res, next) => {

    try {
        const posts = await Post.create(req.body);
        return res.status(200).send({ message: "posts created successfully.", status: 1, data: posts });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.update = async (req, res, next) => {

    var id = req.params.id;
    try {
        const posts = await Post.update(req.body, {
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "posts updated successfully.", status: 1, data: posts });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}

exports.delete = async (req, res, next) => {

    var id = req.params.id;
    try {
        const posts = await Post.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: "posts deleted successfully.", status: 1 });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
}