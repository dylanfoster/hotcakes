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
    it("binds a resource to a set of paths and actions", function (done) {
      router.resource("users");

      client.get("/users")
        .expect(200, [{ id: 1 }])
        .end(done);
    });
  });
});
