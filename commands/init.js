"use strict";

const { Command } = require("@adonisjs/ace");
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const execa = require('execa');
const ora = require("ora");
const Listr = require('listr');
const templates = require("../templates/controllerTemplate");

class Init extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `init`;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Setup Project Structure.";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {

        const tasks = new Listr([
            {
                title: 'Creating Project Sturcture.',
                task: async () => {

                    if (!fs.existsSync("router")) {
                        fs.mkdirSync("router");
                    }

                    fs.writeFile('router/router.js', templates.mainRouteTemplate(name), function (err) {
                        if (err) throw err;
                        console.log(err);
                    })

                    fs.writeFile('index.js', templates.indexTemplate(), function (err) {
                        if (err) throw err;
                        console.log(err);
                    })
                }
            },
            {
                title: 'Installing Dependencies',
                task: async () => {
                    try {
                        await execa("npm install express cors dotenv body-parser nodemon helmet sequelize")
                    } catch (error) {
                        console.log(error)
                    }
                    try {
                        await execa("npm install sequelize-cli -g")
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            {
                title: 'Setting up your project',
                task: async () => {
                    try {
                        await execa("npx sequelize-cli init")
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        ])
        tasks.run().catch(err => {
            console.error(err);
        });
    }
}

module.exports = Init;
