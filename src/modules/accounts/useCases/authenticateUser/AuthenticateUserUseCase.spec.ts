import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersARepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersARepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate an User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersARepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = { 
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    }; 

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token")
  });

  it("Should not be able to authenticate a non existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@test.com",
        password: "1234"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // este teste está passando mesmo com uma senha correta, de modo que estaria retornando um erro do tipo AppError mesmo quando nosso usuário envia a senha correta? Por que?
  it("Should not be able to authenticate an user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = { 
        driver_license: "000123",
        email: "user@test.com",
        password: "1234",
        name: "User test"
      }; 
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      });
    }).rejects.toBeInstanceOf(AppError);
  })

});