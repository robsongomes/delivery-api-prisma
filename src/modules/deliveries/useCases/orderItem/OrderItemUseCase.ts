import { prisma } from "../../../../database/prismaClient";

interface IOrder {
  item_name: string;
  client_id: string;
}

export class OrderItemUseCase {
  async execute({ item_name, client_id }: IOrder) {
    const client = await prisma.users.findFirst({
      where: {
        id: client_id,
        role: "CLIENT",
      },
    });

    if (!client) {
      throw new Error("Invalid token");
    }

    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        client_id: client_id,
      },
    });

    return delivery;
  }
}
