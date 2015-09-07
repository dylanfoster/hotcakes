"use strict";

export default {
  delete: function (req, res, next) {
    res.send(204);
  },
  findById: function (req, res, next) {
    res.send(200, {
      id: 1,
      name: "john smith"
    });
  },
  get: function (req, res, next) {
    res.send(200, [{
      id: 1
    }]);
  },
  post: function (req, res, next) {
    let body = req.body;
    body.id = 2;
    res.send(201, body);
  },
  put: function (req, res, next) {
    res.send(200, {
      id: 1,
      name: "john smith"
    });
  }
}
