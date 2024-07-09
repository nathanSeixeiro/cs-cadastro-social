import express from "express";
import * as bodyParser from "body-parser";

import Router from "./Router";

export default class App {
  private httpServer: any;

  constructor() {
    this.httpServer = express();
    this.httpServer.use(bodyParser.json());
    this.httpServer.use(bodyParser.urlencoded({ extended: true }));

    new Router(this.httpServer);
  }

  public Start(port: number) {
    return new Promise((resolve, reject) => {
      this.httpServer
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => reject(err));
    });
  }
}
