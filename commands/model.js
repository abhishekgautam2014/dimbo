"use strict";

const { Command } = require("@adonisjs/ace");
const execa = require('execa');
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const insertLine = require("insert-line");
const templates = require("../templates/controllerTemplate");

class Model extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `create:model
      { name: New Model }
    `;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Create New Model";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {
        var fieldString = "";
        const countFields = await this.ask("Enter number of fields in table?")
        for (let index = 0; index < countFields; index++) {
            var fieldname = await this.ask("Enter field name?")
            fieldString = fieldString + fieldname + ":";
            var fieldtype = await this.ask("Enter field type?", "string")
            fieldString = fieldString + fieldtype + ",";
        }
        fieldString = fieldString.substring(0, fieldString.length - 1);

        try {
            await execa(`npx sequelize-cli model:generate --name ${name} --attributes ${fieldString} --underscored`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Model;
