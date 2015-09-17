"use strict";

import { ok as Assert } from "assert";
import fs from "fs";
import path from "path";

import inflect from "inflection";


class Router {
  /**
   * @constructor
   *
   * @param {Object} options Router config options
   * @param {Object} options.app Restify app instance
   * @param {String} options.controllersPath path to controllers directory
   * @param {Object} options.restify optios to pass to built in restify app
   */
  constructor(options = {}) {
    Assert(options.controllersPath, "Missing required 'controllersPath' property");
    Assert(options.app, "Missing required app instance");
    let controllers = {};

    this.controllersPath = options.controllersPath;
    this.app = options.app;

    fs.readdirSync(this.controllersPath)
      .forEach(file => {
        let name = file.split(path.extname(file))[0];
        controllers[name] = require(`${this.controllersPath}/${file}`);
      });

    this.controllers = controllers;
  }

  /**
   * resource defines a resource and maps a set of routes to controllers
   *
   * @param {String} name name of the resource
   * @param {Object} options resource config options
   * @param {String} options.path override default route name (<name(s)>
   * @param {String} options.paramKey override default paramKey (id)
   */
  resource(name, options = {}) {
    let controllerName = `${inflect.capitalize(inflect.singularize(name))}Controller`;
    let controller = this.controllers[controllerName];
    this._bindRoutes(name, controller, options);
  }

  /**
   * _bindRoutes binds a resource to a set of routes
   *
   * @param {String} resourceName name of the resource
   * @param {Object} actions controller for resource
   * @param {Object} options resource options
   * @param {String} options.path override default route name (<name(s)>
   * @param {String} options.paramKey override default paramKey (id)
   */
  _bindRoutes(resourceName, actions, options) {
    let paramKey = options.paramKey || "id";
    let routePath = options.path || resourceName;

    this._bindRoute(routePath, "get", actions.get);
    this._bindRoute(`${routePath}/:${paramKey}`, "get", actions.findById);
    this._bindRoute(`${routePath}/:${paramKey}`, "put", actions.put);
    this._bindRoute(routePath, "post", actions.post);
    this._bindRoute(`${routePath}/:${paramKey}`, "del", actions.delete);
  }

  /**
   * _bindRoute binds a route to a controller action
   *
   * @param {String} route the route (/users)
   * @param {String} method HTTP method
   * @param {Function(req, res, next)} action controller action
   */
  _bindRoute(route, method, action) {
    action = action || this._methodNotAllowedError;
    let handlers = [];
    handlers.push(action);
    this.app[method](route, handlers);
  }

  _methodNotAllowedError(req, res, next) {
    return next(new restify.MethodNotAllowedError);
  }

  /**
   * map binds a set of resources to routes/controllers and returns
   * router instance
   *
   * @param {Object} options router config options
   * @param {Object} options.app Restify app instance
   * @param {String} options.controllersPath path to controllers directory
   * @param {Object} options.restify optios to pass to built in restify app
   * @param {Function(router)} callback router instance for extending resources
   */
  static map(options, callback){
    let router = new Router(options);
    callback.call(router);
    return router;
  }
}

export default Router;
