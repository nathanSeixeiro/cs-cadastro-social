import { Request, Response, Router } from "express";
import multer from "multer";
import AssistidoController from "../Controllers/AssistidoController";
import AssistidoRepository from "../Repositories/AssistidoRepository";

const AssistidoRouter = Router();
const repository = new AssistidoRepository();
const controller = new AssistidoController(repository);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Diretório onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usa o nome original do arquivo
  },
});
const upload = multer({ storage });


AssistidoRouter.post(
  "/",
  async (req: Request, res: Response) => await controller.create(req, res)
);
AssistidoRouter.get(
  "/:id",
  async (req: Request, res: Response) => await controller.findById(req, res)
);
AssistidoRouter.get(
  "/",
  async (req: Request, res: Response) => await controller.findAll(req, res)
);
AssistidoRouter.put(
  "/update/:id",
  async (req: Request, res: Response) => await controller.updateState(req, res)
);
AssistidoRouter.post(
  "/:id/upload-photo",
  upload.single("photo"),
  async (req: Request, res: Response) => await controller.uploadPhoto(req, res)
);

export default AssistidoRouter;
