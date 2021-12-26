import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import jsonwebtoken from "jsonwebtoken";

interface IUserCredentials {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IUserCredentials) {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const match = compare(password, user.password);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    const token = jsonwebtoken.sign(
      {
        sub: user.id,
      },
      "estaehumastringaleatoriaparaachavedotoken",
      { expiresIn: "30m" }
    );

    return token;
  }
}
