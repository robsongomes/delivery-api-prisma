import { Request, Response } from "express";
import { OrderItemUseCase } from "./OrderItemUseCase";

export class OrderItemController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const { item_name } = req.body;

    const useCase = new OrderItemUseCase();

    const order = await useCase.execute({ item_name, client_id: user_id });

    return res.json(order);
  }
}
