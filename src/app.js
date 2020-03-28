require('dotenv').config();

const express = require("express");


class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    // const url = "https://revistaautoesporte.globo.com/rss/ultimas/feed.xml";

  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new AppController().express;
