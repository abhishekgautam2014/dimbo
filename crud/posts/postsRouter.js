
    
module.exports = function(app) {

    const postsController = require("./postsController.js");
    
    app.get(
        "/api/posts",
        postsController.index
    );
    app.get(
        "/api/posts/:id",
        postsController.show
    );
    app.post(
        "/api/posts",
        postsController.create
    );
    app.put(
        "/api/posts/:id",
        postsController.update
    );
    app.delete(
        "/api/posts/:id",
        postsController.delete
    );
}