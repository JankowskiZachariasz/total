require('dotenv').config()
const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3001;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.all("/api/user", (req, res) => {
      return handle(req, res);
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, '192.168.1.47', err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });