

module.exports = function (app) {

    require("../crud/users/usersRouter.js")(app);
    require("../crud/posts/postsRouter.js")(app);

}