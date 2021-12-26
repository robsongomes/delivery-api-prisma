import { Request, Response } from "express";
import { DeliverItemUseCase } from "./DeliverItemUseCase";

export class DeliverItemController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const { delivery_id } = req.body;

    console.log(user_id);

    const useCase = new DeliverItemUseCase();

    const order = await useCase.execute({
      delivery_id,
      deliveryman_id: user_id,
    });

    return res.json(order);
  }
}
