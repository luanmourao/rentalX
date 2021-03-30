import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error("This e-mail already exists");
    }

    const hashPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license
    });
  }
}

export { CreateUserUseCase };