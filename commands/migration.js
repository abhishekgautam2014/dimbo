"use strict";

const { Command } = require("@adonisjs/ace");
const execa = require('execa');
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const insertLine = require("insert-line");
const templates = require("../templates/controllerTemplate");

class Migration extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `migration
      { name: New Migration }
    `;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Create Migration";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {
        try {
            await execa(`npx sequelize-cli migration:generate --name ${name}`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Migration;
