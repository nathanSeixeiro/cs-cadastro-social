import { Express, Router } from "express";
import AvisoRouter from "./AvisoRouter";
import UsuarioRouter from "./UsuarioRouter";

export default class MainRouter {
  constructor(server: Express) {
    const router = Router();
    router.use("/aviso", AvisoRouter);
    router.use("/usuario", UsuarioRouter);

    router.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    server.use("/", router);
  }
}
