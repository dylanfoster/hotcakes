"use strict";

import path from "path";

import restify from "restify";

import Router from "./router";

const DEFAULT_PLUGINS = [
  restify.bodyParser(),
  restify.fullResponse(),
  restify.queryParser()
];

class Stack {
  /**
   * @constructor
   *
   * @param {Object} options Hotcakes config options
   * @param {Object} options.app Restify app instance
   * @param {String} options.controllersPath path to controllers directory
   * @param {Number|String} options.port port for restify app to listen on
   * @param {Object} options.restify optios to pass to built in restify app
   */
  constructor(options = {}) {
    this.app = options.app || restify.createServer(options.restify);
    this.controllersPath = options.controllersPath || path.resolve(path.dirname(module.parent.filename), "controllers");
    let self = this;
    Router.map = function (callback) {
      let router = new Router({
        app: self.app,
        controllersPath: self.controllersPath
      });
      callback.call(router);
      return router;
    };
    this.options = options;
    this.Router = Router;

    this._initializePlugins(options.plugins);
  }

  /**
   * boot initializes app and begins listening
   */
  boot() {
    DEFAULT_PLUGINS.forEach(plugin => {
      this.app.use(plugin);
    });
    return this.app.listen(this.options.port || 3800);
  }

  _initializePlugins(plugins) {
    if (plugins) {
      plugins.forEach(plugin => {
        this.app.use(plugin);
      });
    }
  }
}

export default Stack;
