"use strict";

import { ok as Assert } from "assert";
import fs from "fs";
import path from "path";

import inflect from "inflection";
import restify from "restify";

class Router {
  constructor(options = {}) {
    Assert(options.controllersPath, "Missing required 'controllersPath' property");
    this.controllersPath = options.controllersPath;
    this._routes = new Map();
    this.app = options.app || restify.createServer();
    this.app.use(
        restify.fullResponse(),
        restify.queryParser(),
        restify.bodyParser()
    );
  }

  resource(name, options = {}) {
    let controllers = {};

    fs.readdirSync(this.controllersPath)
      .forEach(file => {
        let name = file.split(path.extname(file))[0];
        controllers[name] = require(`${this.controllersPath}/${file}`);
      });

    let controllerName = `${inflect.capitalize(inflect.singularize(name))}Controller`;
    let controller = controllers[controllerName];
    this._bindRoutes(name, controller, options);
  }

  _bindRoutes(resourceName, actions, options) {
    let paramKey = options.paramKey || "id";
    let routePath = options.path || resourceName;

    this._bindRoute(routePath, "get", actions.get);
    this._bindRoute(`${routePath}/:${paramKey}`, "get", actions.findById);
    this._bindRoute(`${routePath}/:${paramKey}`, "put", actions.put);
    this._bindRoute(routePath, "post", actions.post);
    this._bindRoute(`${routePath}/:${paramKey}`, "del", actions.delete);
  }

  _bindRoute(route, method, action) {
    let handlers = [];
    handlers.push(action);
    this.app[method](route, handlers);
  }

  static map(options, callback){
    let router = new Router(options);
    callback.call(router);
    return router;
  }
}

export default Router;
