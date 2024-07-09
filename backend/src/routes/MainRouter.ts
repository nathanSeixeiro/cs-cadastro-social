import { Express, Router } from "express";
import AvisoRouter from "./AvisoRouter";

export default class MainRouter {
  constructor(server: Express) {
    const router = Router();
    router.use("/aviso", AvisoRouter);

    router.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    server.use("/", router);
  }
}
