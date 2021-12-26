import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password, deliveryman } = request.body;

    const useCase = new CreateUserUseCase();

    const user = await useCase.execute({ username, password, deliveryman });

    return response.json(user);
  }
}
