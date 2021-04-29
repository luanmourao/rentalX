import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });

  it("should be able to send a forgot password mail to an user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "666666",
      email: "uahsuahu@sioakks.com",
      name: "Bob Carlson",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("uahsuahu@sioakks.com");

    expect(sendMail).toHaveBeenCalled();

  });

  it("should not be able to send a forgot password mais to a non existing user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("uahsuahu@gmail.com")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create a token to an user who forgots the password", async () => {
    const createToken = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "666666",
      email: "uahsuahu@sioakks.com",
      name: "Bob Carlson",
      password: "1234"
    });

    await sendForgotPasswordMailUseCase.execute("uahsuahu@sioakks.com");

    expect(createToken).toBeCalled();
  });

})