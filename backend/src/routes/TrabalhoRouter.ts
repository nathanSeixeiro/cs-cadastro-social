import { Router } from "express";
import TrabalhoController from "../Controllers/TrabalhoController";
import TrabalhoRepository from "../Repositories/TrabalhoRepository";

const TrabalhoRouter = Router();
const repository = new TrabalhoRepository();
const controller = new TrabalhoController(repository);

TrabalhoRouter.post(
  "/",
  async (req, res) => await controller.create(req, res)
);
TrabalhoRouter.get(
  "/:id",
  async (req, res) => await controller.findById(req, res)
);
TrabalhoRouter.get("/", async (req, res) => await controller.findAll(req, res));
TrabalhoRouter.put(
  "/update/:id",
  async (req, res) => await controller.update(req, res)
);
TrabalhoRouter.delete(
  "/:id",
  async (req, res) => await controller.delete(req, res)
);

export default TrabalhoRouter;
