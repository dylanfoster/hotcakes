"use strict";

export default {
  get: function (req, res, next) {
    res.send(200, { message: "person not people" }).end();
  }
};
