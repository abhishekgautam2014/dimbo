"use strict";

const { Command } = require("@adonisjs/ace");
const path = require("path");
const fs = require("fs");
const insertLine = require("insert-line");
const templates = require("../templates/controllerTemplate");

class Crud extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature() {
    return `crud
      { name: New CRUD }
    `;
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description() {
    return "Create CRUD APIs";
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object
   * @param {*} flags  arguments object
   */
  async handle({ name }) {

    if (!fs.existsSync("crud/" + name)) {
      fs.mkdirSync("crud/" + name);
    }

    fs.writeFile(`crud/${name}/${name}Controller.js`, templates.controllerTemplate(name), function (err) {
      if (err) throw err;
      console.log(err);
    })

    fs.writeFile(`crud/${name}/${name}Router.js`, templates.routeTemplate(name), function (err) {
      if (err) throw err;
      console.log(err);
    })

    //write crudroutes in main route file
    var appDir = path.dirname(require.main.filename) + "/router/router.js";
    const addRoute = `    require("../crud/${name}/${name}Router.js")(app);`
    await insertLine(appDir).content(addRoute).at(5);

    console.info(`${name} crud api created successfully.`);
  }
}

module.exports = Crud;
