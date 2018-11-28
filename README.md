  _**Micro-Start** — Start micro or micro-dev programmaticly_

## Installation

```bash
npm install --save micro-start
```

## Usage

Create an `index.js` file and a `micro.js` file

```js
// index.js
const start = require("micro-start");

// start micro
start("./micro");

// start micro-dev
start("./micro", isDevelopment = process.env.NODE_ENV === "development")

// control callback for production
start("./micro", { callback: server => {
    const { address, port } = server.address();
    //log that the server has started
  }
})
```

```js
// micro.js
module.exports = (req, res) => {
  res.end('Welcome to Micro')
}
```

An example using the NODE_ENV environment variable add a `start` and `dev` script:

```json
{
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development node index.js",
  }
}
```

A production server can be started like this:

```bash
npm start
```
A development server can be started like this:

```bash
npm run dev
```

## Options

##### `start(file, { isDevelopment = false, host = "::", port = 3000, callback })`

- `file` is a `String`. Required - is a relative path to your micro handler.
- `config` is an `Object`
  - `isDevelopment` is a `Boolean`. Default is false.
  - `host` is a `String`. Default is IPV6 "::" or IPV4 "0.0.0.0"
  - `port` is a `Number`. Default is 3000. In development mode, if port 3000 is taken micro-dev will choose an open port.
  - `callback` is a `Function`. It has one parameter - a server object https://nodejs.org/api/net.html#net_class_net_server