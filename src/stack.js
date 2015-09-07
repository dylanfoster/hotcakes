"use strict";

import path from "path";
import Router from "./router";

class Stack {
  constructor(options = {}) {
    this.controllersPath = options.controllersPath || path.resolve("controllers");
    this.Router = Router;
    this.Router.map = this.Router.map.bind(this, {
      controllersPath: this.controllersPath
    });
  }
}

export default Stack;
