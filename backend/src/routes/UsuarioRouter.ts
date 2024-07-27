import { Request, Response, Router } from "express";
import UsuarioController from "../Controllers/UsuarioController";
import UsuarioRepository from "../Repositories/UsuarioRepository";

const UsuarioRouter = Router();
const repository = new UsuarioRepository();
const controller = new UsuarioController(repository);

UsuarioRouter.post(
  "/",
  async (req: Request, res: Response) => await controller.create(req, res)
);
UsuarioRouter.get(
  "/:id",
  async (req, res) => await controller.findById(req, res)
);
UsuarioRouter.get("/", async (req, res) => await controller.findAll(req, res));
UsuarioRouter.put(
  "/update/:id",
  async (req, res) => await controller.update(req, res)
);
UsuarioRouter.delete(
  "/:id",
  async (req, res) => await controller.delete(req, res)
);
UsuarioRouter.put(
  "/setStatus/:id",
  async (req, res) => await controller.setStatus(req, res)
);
export default UsuarioRouter;
