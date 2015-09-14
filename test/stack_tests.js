"use strict";

import path from "path";

import supertest from "supertest";

import Hotcakes from "../src/stack";

describe("Hotcakes", function () {
  let client, hotcake;

  beforeEach(function () {
    hotcake = new Hotcakes({
      controllersPath: path.resolve(__dirname, "fixtures/controllers"),
      port: 3801
    });
  });

  describe("boot", function () {
    it("bootraps and routes specified requests", function (done) {
      hotcake.Router.map(function () {
        this.resource("users");
      });

      client = supertest(hotcake.boot());
      client.get("/users")
        .end(function (err, res) {
          if (err) { return done(err); }

          done();
        });
    });
  });
});
