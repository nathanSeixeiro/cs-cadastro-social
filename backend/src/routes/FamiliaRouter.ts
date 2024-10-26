import FamiliaController from "../Controllers/FamilaController";
import FamiliaRepository from "../Repositories/FamiliaRepository";
import { Router } from "express";

const FamiliaRouter = Router();
const repository = new FamiliaRepository();
const controller = new FamiliaController(repository);

FamiliaRouter.post("/", async (req, res) => await controller.create(req, res));
FamiliaRouter.get(
  "/:id",
  async (req, res) => await controller.findById(req, res)
);
FamiliaRouter.get(
  "/usuario/:id",
  async (req, res) => await controller.findByUsuario(req, res)
);
FamiliaRouter.put(
  "/update/:id",
  async (req, res) => await controller.update(req, res)
);
FamiliaRouter.delete(
  "/:id",
  async (req, res) => await controller.delete(req, res)
);

export default FamiliaRouter;
