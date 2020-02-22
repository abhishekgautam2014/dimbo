
    
module.exports = function(app) {

    const usersController = require("./usersController.js");
    
    app.get(
        "/api/users",
        usersController.index
    );
    app.get(
        "/api/users/:id",
        usersController.show
    );
    app.post(
        "/api/users",
        usersController.create
    );
    app.put(
        "/api/users/:id",
        usersController.update
    );
    app.delete(
        "/api/users/:id",
        usersController.delete
    );
}