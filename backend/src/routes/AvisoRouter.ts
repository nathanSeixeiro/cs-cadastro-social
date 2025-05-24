/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, Router } from "express";
import AvisoController from "../Controllers/AvisoController";
import AvisoRepository from "../Repositories/AvisoRepository";

const AvisoRouter = Router();
const repository = new AvisoRepository();
const controller = new AvisoController(repository);

AvisoRouter.post("/", async (req: Request, res: Response) => await controller.create(req, res));
AvisoRouter.get(
  "/:id",
  async (req, res) => await controller.findById(req, res)
);
AvisoRouter.get("/", async (req, res) => await controller.findAll(req, res));
AvisoRouter.delete(
  "/:id",
  async (req, res) => await controller.delete(req, res)
);
AvisoRouter.put(
  "/update/:id",
  async (req, res) => await controller.update(req, res)
);

export default AvisoRouter;
