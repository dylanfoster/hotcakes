# hotcakes

> hotcakes pic

![](/hotcakes.png)

hotcakes is a RESTful framework built with configuration in mind. It uses [restify](http://mcavage.me/node-restify/) under the hood for routing and makes building your REST api quick and easy.

## Installtion

```shell
npm install --save hotcakes
```

## Usage

hotcakes by default looks for your controllers in `<cwd>/controllers`, however, this can be overidden in the hotcake constructor. An example structure might look like this

```shell
|- lib/
  |_ controllers/
  |_ models/
  |_ app.js
|- index.js
```

app.js

```javascript
var Stack = require("hotcakes");
var hotcake = new Stack({ ...config... });

hotcake.router.map(function () {
  this.resource("users");
  // or with a path
  this.resource("user", { path: "users/:id" });
});

module.exports = hotcake;
```

index.js

```javascript
var app = require("./lib/app");

// initialize your api and start listening. Listens on 3800 by default
app.boot();
```

## Controllers

> TODO: add content

## Routes

> TODO: add content

## Contributing

> TODO: add content

## License

The MIT License (MIT)

Copyright (c) 2015 Dylan Foster <dylan947@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
