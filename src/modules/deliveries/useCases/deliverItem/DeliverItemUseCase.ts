import { prisma } from "../../../../database/prismaClient";

interface IOrder {
  delivery_id: string;
  deliveryman_id: string;
}

export class DeliverItemUseCase {
  async execute({ delivery_id, deliveryman_id }: IOrder) {
    const deliveryman = await prisma.users.findFirst({
      where: {
        id: deliveryman_id,
        role: "DELIVERYMAN",
      },
    });

    console.log(deliveryman);

    if (!deliveryman) {
      throw new Error("Invalid token");
    }

    const delivery = await prisma.deliveries.update({
      where: {
        id: delivery_id,
      },
      data: {
        delivered_at: new Date(),
        deliveryman_id: deliveryman.id,
      },
    });

    return delivery;
  }
}
