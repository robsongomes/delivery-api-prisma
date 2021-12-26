import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AutheticateUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const useCase = new AuthenticateUserUseCase();

    const token = await useCase.execute({ username, password });

    return res.json({ token });
  }
}
