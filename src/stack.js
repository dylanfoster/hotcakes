"use strict";

import path from "path";

import restify from "restify";

import Router from "./router";

const DEFAULT_PLUGINS = [
  "bodyParser",
  "fullResponse",
  "queryParser"
];

class Stack {
  constructor(options = {}) {
    this.app = options.app || restify.createServer();
    this.controllersPath = options.controllersPath || path.resolve("controllers");
    let self = this;
    Router.map = function (callback) {
      let router = new Router({
        app: self.app,
        controllersPath: self.controllersPath
      });
      callback.call(router);
      return router;
    }
    this.Router = Router;
  }

  boot(options = {}) {
    this.app.use(DEFAULT_PLUGINS);
    return this.app;
  }
}

export default Stack;
