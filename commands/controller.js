"use strict";

const { Command } = require("@adonisjs/ace");
const execa = require('execa');
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const insertLine = require("insert-line");
const templates = require("../templates/controllerTemplate");

class Controller extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `create:controller
        { name: New Controller }`;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Create New Controller";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {
        await makeDir(`controller/${name}`);

        fs.writeFile(`controller/${name}/${name}Controller.js`, templates.defaultControllerTemplate(), function (err) {
            if (err) throw err;
        })

        fs.writeFile(`controller/${name}/${name}Router.js`, templates.defaultRouteTemplate(), function (err) {
            if (err) throw err;
        })

        const routerPath = process.cwd() + "/router/router.js";
        // //write crudroutes in main route file
        const addRoute = `    require("../controller/${name}/${name}Router.js")(app);`
        await insertLine(routerPath).content(addRoute).at(3);

        console.info(`${name} controller created successfully.`);
    }
}

module.exports = Controller;
