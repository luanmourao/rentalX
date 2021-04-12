import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date()
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be able to create a new rental with 24 hours of duration at least", async () => {

  });

  it("should not be able to create a new rental if there is another rental in process to the same user", async () => {

    return expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date()
      });
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "101010",
        expected_return_date: new Date()
      });

    }).rejects.toBeInstanceOf(AppError);

  });

  it("should not be able to create a new rental if there is another rental in process to the same car", async () => {

    return expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234567",
        car_id: "121212",
        expected_return_date: new Date()
      });
  
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date()
      });

    }).rejects.toBeInstanceOf(AppError);

  });
})