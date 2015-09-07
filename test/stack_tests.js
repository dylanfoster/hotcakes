"use strict";

import path from "path";

import { expect } from "chai";
import supertest from "supertest";

import Hotcakes from "../lib/stack";

describe("Hotcakes", function () {
  let client, hotcake;

  beforeEach(function () {
    hotcake = new Hotcakes({
      controllersPath: path.resolve(__dirname, "fixtures/controllers")
    });
  });

  describe("routing", function () {
    it("bootraps and routes specified requests", function (done) {
      let router = hotcake.Router.map(function () {
        this.resource("users");
      });

      client = supertest(router.app);
      client.get("/users")
        .expect(200, [{ id: 1 }])
        .end(done);
    });
  });
});
