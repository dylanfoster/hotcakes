"use strict";

let data = [{
  id: 1
}];

let db = {
  find: function (id) {
    let record = data.filter(d => {
      return d.id = id;
    });
    return record[0];
  }
};

export default {
  get: function (req, res, next) {
    res.send(200).end();
  },
  findById: function (req, res, next) {
    let body = db.find(req.params.bar_id);
    res.send(200, body);
  }
};
