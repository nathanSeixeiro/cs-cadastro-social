import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import "./utils/cron";
import MainRouter from "./routes/MainRouter";
import path from "path";

export default class App {
  private httpServer: express.Express;

  constructor() {
    this.httpServer = express();
    this.httpServer.use(cors());
    this.httpServer.use(bodyParser.json());


    this.httpServer.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    // this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    
    new MainRouter(this.httpServer);
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
