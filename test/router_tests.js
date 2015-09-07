"use strict";

import path from "path";

import { expect } from "chai";
import restify from "restify";
import supertest from "supertest";

import Router from "../lib/router";

describe("Router", function () {
  let client, router;

  beforeEach(function () {
    router = new Router({
      app: restify.createServer(),
      controllersPath: path.resolve(__dirname, "fixtures/controllers")
    });
    client = supertest(router.app);
  });

  describe("resource", function () {
    beforeEach(function () {
      router.resource("users");
    });

    it("binds a resource to a GET request", function (done) {
      client.get("/users")
        .expect(200, [{ id: 1 }])
        .end(done);
    });

    it("binds a resource to a GET request when asking for id", function (done) {
      client.get("/users/1")
        .expect(200, { id: 1, name: "john smith" })
        .end(done);
    });

    it("binds a resource to a PUT request", function (done) {
      client.put("/users/1")
        .send({ name: "john smith" })
        .expect(200, { id: 1, name: "john smith" })
        .expect("Content-Type", /json/)
        .end(done);
    });

    it("binds a resource to a POST request", function (done) {
      client.post("/users")
        .send({ name: "john smith" })
        .expect(201, { id: 2, name: "john smith" })
        .expect("Content-Type", /json/)
        .end(done);
    });

    it("binds a resource to a DELETE request", function (done) {
      client.del("/users/1")
        .expect(204)
        .end(done);
    });
  });

  describe("map", function () {
    it("maps resources to router", function (done) {
      let router = Router.map({
        controllersPath: path.resolve(__dirname, "fixtures/controllers")
      }, function () {
        this.resource("users");
      });

      client = supertest(router.app);

      client.get("/users")
        .expect(200, [{ id: 1 }])
        .end(done);
    });
  });
});
