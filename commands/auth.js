"use strict";

const { Command } = require("@adonisjs/ace");
const execa = require('execa');
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const insertLine = require("insert-line");
const templates = require("../templates/authTemplate");

class Auth extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `create:auth`;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Create Authentication API";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {
        await makeDir(`auth`);

        fs.writeFile(`auth/loginController.js`, templates.login(), function (err) {
            if (err) throw err;
        })

        fs.writeFile(`auth/registerController.js`, templates.register(), function (err) {
            if (err) throw err;
        })

        fs.writeFile(`auth/authRouter.js`, templates.authRouteTemplate(), function (err) {
            if (err) throw err;
        })

        //create migration filr for auth
        const fieldString = "name:string,email:string,password:string";
        try {
            await execa(`npx sequelize-cli model:generate --name User --attributes ${fieldString}`)
        } catch (error) {
            console.log(error)
        }

        const routerPath = process.cwd() + "/router/router.js";
        //write authroutes in main route file
        const addRoute = `    require("../auth/authRouter")(app);`
        await insertLine(routerPath).content(addRoute).at(5);

        console.info(`Authentication api created successfully.`);
    }
}

module.exports = Auth;
