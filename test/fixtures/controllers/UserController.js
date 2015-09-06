"use strict";

export default {
  get: function (req, res, next) {
    res.send(200, [{
      id: 1
    }]);
  }
}
