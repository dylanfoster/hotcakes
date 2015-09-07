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
  constructor(options = {}) {
    this.app = options.app || restify.createServer(options.restify);
    this.controllersPath = options.controllersPath || path.resolve("controllers");
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
  }

  boot(options = {}) {
    DEFAULT_PLUGINS.forEach(plugin => {
      this.app.use(plugin);
    });
    return this.app.listen(this.options.port || 3800);
  }
}

export default Stack;
