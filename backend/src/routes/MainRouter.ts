import { Express, Router } from "express";
import AvisoRouter from "./AvisoRouter";
import UsuarioRouter from "./UsuarioRouter";
import AuthRouter from "./AuthRouter";

export default class MainRouter {
  constructor(server: Express) {
    const router = Router();
    router.use("/aviso", AvisoRouter);
    router.use("/usuario", UsuarioRouter);
    router.use("/auth", AuthRouter);

    router.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    server.use("/", router);
  }
}
