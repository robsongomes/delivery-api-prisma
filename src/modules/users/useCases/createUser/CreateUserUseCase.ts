import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

enum Role {
  CLIENT = "CLIENT",
  DELIVERYMAN = "DELIVERYMAN",
}

interface ICreateUser {
  username: string;
  password: string;
  deliveryman: boolean;
}

export class CreateUserUseCase {
  async execute({ username, password, deliveryman = false }: ICreateUser) {
    const userExists = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashPwd = await hash(password, 10);

    const user = await prisma.users.create({
      data: {
        username,
        password: hashPwd,
        role: deliveryman ? Role.DELIVERYMAN : Role.CLIENT,
      },
    });

    return user;
  }
}
