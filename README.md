# hotcakes

![](/hotcakes.png)

hotcakes is a RESTful framework built with configuration in mind. It uses
[restify](http://mcavage.me/node-restify/) under the hood for routing and makes
building your REST api quick and easy.

## Installtion

```shell
npm install --save hotcakes
```

## Usage

hotcakes by default looks for your controllers in `<cwd>/controllers`, however,
this can be overidden in the hotcake constructor. An example structure might
look like this

```shell
|- lib/
  |_ controllers/
  |_ models/
  |_ app.js
|- index.js
```

app.js

```javascript
import Stack from "hotcakes";

let hotcake = new Stack({ ...config... });

export default hotcake;
```

index.js

```javascript

import app from "./lib/app";

// initialize your api and start listening. Listens on 3800 by default
app.boot();
```

## Controllers

Controllers handle actions. Controllers should be defined by their route
counterpart and the controller files should be in PascalCase e.g. `UserContoller.js`
Controllers' actions map to HTTP methods, with the exception of a route defined
as a sub resource (e.g. `/users/:id` which will map to a `findById` controller
action. If an HTTP method is not defined for one of your controllers, hotcakes
will return a `MethodNotAllowed` error. An example controller

UserController.js

```javascript
export default {
  get: function (req, res, next) {
    db.findById(req.params.id).then(function (user) {
      res.send(200, user);
    });
  },
  post: function (req, res, next) {
    db.create(req.body).then(
  }
};
```

## Routes

Routes are the api. Routes define where requests should go and what to do with
them. Defining routes with hotcakes is super simple.

app.js

```javascript
import Stack from "hotcakes";

let hotcake = new Stack({ ...config... });
let Router = hotcake.Router;

hotcake.router.map(function () {
  this.resource("users");

  // define a path otherwise the path will be implied

  this.resource("user", { path: "users/:id" });

  // implied as path: "users/:user_id"
});

export default hotcake;
```

The above will generate the following routes automatically, using user defined
controllers for each action (e.g `GET /users` calls `UserController#get`)

```shell
GET /users        -> UserController.get
GET /users/:id    -> UserController.findById
PUT /users/:id    -> UserController.put
POST /users       -> UserController.post
DELETE /users/:id -> UserController.delete
```

## Contributing

> TODO: add content

## License

The MIT License (MIT)

Copyright (c) 2015 Dylan Foster <dylan947@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in the
Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
