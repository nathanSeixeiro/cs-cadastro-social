import { Request, Response, Router } from "express";
import AssistidoController from "../Controllers/AssistidoController";
import AssistidoRepository from "../Repositories/AssistidoRepository";

const AssistidoRouter = Router()
const repository = new AssistidoRepository()
const controller = new AssistidoController(repository)

AssistidoRouter.post("/", async(req: Request, res: Response) => await controller.create(req, res))
AssistidoRouter.get("/:id", async (req: Request, res: Response) => await controller.findById(req, res))
AssistidoRouter.get("/", async(req: Request, res: Response) => await controller.findAll(req, res))
AssistidoRouter.put("/update/:id", async(req: Request, res: Response) => await controller.updateState(req, res))

export default AssistidoRouter; 