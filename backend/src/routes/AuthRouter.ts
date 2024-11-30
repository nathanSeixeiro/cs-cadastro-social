import { Request, Response, Router } from "express";
import AuthRepository from "./../Repositories/AuthRepository";
import UsuarioRepository from "../Repositories/UsuarioRepository";
import AuthController from "../Controllers/AuthController";

const AuthRouter = Router();
const authRepository = new AuthRepository();
const usuarioRepository = new UsuarioRepository();
const controller = new AuthController(authRepository, usuarioRepository);

// Rota de login
AuthRouter.post("/", async (req: Request, res: Response) => await controller.login(req, res));

// Rota de "esqueci a senha"
AuthRouter.post("/forgot-password", async (req: Request, res: Response) =>
  await controller.forgotPassword(req, res)
);

// Rota de "nova senha"
AuthRouter.post("/reset-password", async (req: Request, res: Response) =>
  await controller.resetPassword(req, res)
);

export default AuthRouter;
