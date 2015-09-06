"use strict";

import fs from "fs";
import path from "path";

import inflect from "inflection";

class Router {
  constructor(options = {}) {
    this._routes = new Map();
    this.app = options.app || restify.createServer();
    this.controllersPath = options.controllersPath || path.resolve("controllers");
  }

  resource(name) {
    let controllers = {};

    fs.readdirSync(this.controllersPath)
      .forEach(file => {
        let name = file.split(path.extname(file))[0];
        controllers[name] = require(`${this.controllersPath}/${file}`);
      });

    let controllerName = `${inflect.capitalize(inflect.singularize(name))}Controller`;
    let controller = controllers[controllerName];

    this._bindRoutes(name, controller);
  }

  _bindRoutes(resourceName, actions) {
    this._bindRoute(resourceName, "get", actions.get);
  }

  _bindRoute(route, method, action) {
    let handlers = [];
    handlers.push(action);
    this.app[method](route, handlers);
  }
}

export default Router;
