import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate an User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
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

  it("Should not be able to authenticate a non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@test.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError('E-mail or password incorrect!'));
  });

  it("Should not be able to authenticate an user with incorrect password", async () => {
    const user: ICreateUserDTO = { 
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User test"
    }; 

    await createUserUseCase.execute(user);
    
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError('E-mail or password incorrect!'));
  })

});