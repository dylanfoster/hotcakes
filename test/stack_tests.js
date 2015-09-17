"use strict";

import path from "path";

import { expect } from "chai";
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

  it("accurately sets default 'controllersPath'", function () {
    let hotcake = new Hotcakes();
    let expectedPath = path.resolve(__dirname, "controllers");
    expect(hotcake.controllersPath).to.eql(expectedPath);
  });

  describe("plugins", function () {
    it("allows for custom plugins", function (done) {
      let plugin = function (req, res, next) {
        res.send(400, { message: "plugin error" }).end();
      };

      let hotcake = new Hotcakes({
        controllersPath: path.resolve(__dirname, "fixtures/controllers"),
        plugins: [plugin]
      });

      hotcake.Router.map(function () {
        this.resource("foo");
      });

      client = supertest(hotcake.boot());

      client.get("/foo")
        .expect(400, { message: "plugin error" })
        .end(done);
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
