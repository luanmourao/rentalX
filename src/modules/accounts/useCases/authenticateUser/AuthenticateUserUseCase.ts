import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {

    // verificar se o usuário existe 
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("E-mail or password incorrect!");
    }

    // verificar se a senha passada corresponde à cadastrada para esse usuário
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("E-mail or password incorrect!");
    }

    // gerar o JWT
    const token = sign({}, "2a0f30d1f57a06d3c490a51cbe23c2be", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };