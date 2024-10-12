import { Request, Response, Router } from "express";
import AuthRepository from './../Repositories/AuthRepository';
import UsuarioRepository from "../Repositories/UsuarioRepository";
import AuthController from "../Controllers/AuthController";

const AuthRouter = Router();
const authRepository = new AuthRepository();
const usuarioRepository = new UsuarioRepository();
const controller = new AuthController(authRepository, usuarioRepository);

AuthRouter.post("/", async (req: Request, res: Response) => await controller.login(req, res));


export default AuthRouter;
