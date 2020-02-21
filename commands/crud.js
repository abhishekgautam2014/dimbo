"use strict";

const { Command } = require("@adonisjs/ace");
const makeDir = require("make-dir");
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
    const controllerPath = await makeDir(
      path.dirname(require.main.filename) + "/crud/" + name
    );
    var controllerStream = fs.createWriteStream(
      controllerPath + "/" + name + "Controller.js"
    );
    controllerStream.write(templates.controllerTemplate(name));
    controllerStream.end();

    var routeStream = fs.createWriteStream(controllerPath + "/" + name + "Router.js");
    routeStream.write(templates.routeTemplate(name));
    routeStream.end();

    //write crudroutes in main route file
    var appDir = path.dirname(require.main.filename) + "/router/router.js";
    const addRoute = `    require("../crud/${name}/${name}Router.js")(app);`
    await insertLine(appDir).content(addRoute).at(5);

    console.info(`${name} crud api created successfully.`);
  }
}

module.exports = Crud;
