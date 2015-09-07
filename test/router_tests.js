"use strict";

import path from "path";

import { expect } from "chai";
import restify from "restify";
import supertest from "supertest";

import Router from "../src/router";

describe.only("Router", function () {
  let app, client, router;

  it("requires 'controllersPath'", function () {
    expect(function () {
      new Router();
    }).to.throw("Missing required 'controllersPath' property");
  });

  it("requires a restify app", function () {
    expect(function () {
      new Router({
        controllersPath: "foo"
      });
    }).to.throw("Missing required app instance");
  });

  beforeEach(function () {
    app = restify.createServer();
    app.use(restify.bodyParser(),
            restify.fullResponse(),
            restify.queryParser()
        );
    router = new Router({
      app: app,
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

    it("allows for path overriding", function (done) {
      router.resource("foo", { path: "/bar" });

      client.get("/bar")
        .expect(200)
        .end(done);
    });

    it("allows for paramKey overriding", function (done) {
      router.resource("foo", { paramKey: "bar_id" });

      client.get("/foo/1")
        .expect(200, { id: 1 })
        .end(done);
    });
  });

  describe("map", function () {
    it("maps resources to router", function (done) {
      let router = Router.map({
        app: app,
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
