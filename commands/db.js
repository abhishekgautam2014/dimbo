"use strict";

const { Command } = require("@adonisjs/ace");
const fs = require("fs");
const execa = require('execa');
const Ora = require("ora");

class DB extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `db:connect`;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Connect you database.";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {
        const dbtype = await this.choice("Select you database connection?", [
            "Mysql",
            "Postgres"
        ])
        if (dbtype == "Mysql") {
            const spinner = Ora("Installing mysql driver.")
            spinner.start()
            spinner.color = "magenta";
            try {
                await execa("npm install mysql2")
            } catch (error) {
                console.log(error)
            }
            spinner.succeed("Mysql driver installed successfully.")
        }

        if (dbtype == "Postgres") {
            const spinner = Ora("Installing postgres sql driver.")
            spinner.start()
            spinner.color = "magenta";
            try {
                await execa("npm install pg pg-hstore")
            } catch (error) {
                console.log(error)
            }
            spinner.succeed("Postgres driver installed successfully.")
        }

        // read database config json file
        const config = fs.readFileSync("config/config.json");
        var data = JSON.parse(config);
        if (dbtype == "Mysql") {
            data.development.dialect = "mysql";
            const database_username = await this.ask("What is you database username?", "root")
            data.development.username = database_username;
            const database_password = await this.ask("What is you database password?", null)
            data.development.password = database_password;
            const database_name = await this.ask("What is you database name?", null)
            data.development.database = database_name;
        }
        if (dbtype == "Postgres") {
            data.development.dialect = "postgres";
            const database_username = await this.ask("What is you database username?", "root")
            data.development.username = database_username;
            const database_password = await this.ask("What is you database password?", null)
            data.development.password = database_password;
            const database_name = await this.ask("What is you database name?", null)
            data.development.database = database_name;
        }

        let finaldata = JSON.stringify(data, null, 2);

        fs.writeFile('config/config.json', finaldata, (err) => {
            if (err) throw err;
            console.log(err);
        });
        try {
            await execa(`npx sequelize-cli db:create`)
            console.log(`${this.icon('success')} ${data.development.database} databse created.`)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DB;
