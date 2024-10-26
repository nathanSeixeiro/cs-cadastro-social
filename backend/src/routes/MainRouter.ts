import { Express, Router } from "express";
import AvisoRouter from "./AvisoRouter";
import UsuarioRouter from "./UsuarioRouter";
import AuthRouter from "./AuthRouter";
import FamiliaRouter from "./FamiliaRouter";

export default class MainRouter {
  constructor(server: Express) {
    const router = Router();
    server.use("/", router);
    router.use("/auth", AuthRouter);
    router.use("/aviso", AvisoRouter);
    router.use("/usuario", UsuarioRouter);
    router.use("/familia", FamiliaRouter);
  }
}
