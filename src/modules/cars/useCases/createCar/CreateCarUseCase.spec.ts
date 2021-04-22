import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({ 
      name: "Car Name", 
      description: "Car description", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Car brand", 
      category_id: "category_id"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with an existent license plate", async () => {
    await createCarUseCase.execute({ 
      name: "Car1", 
      description: "Car description", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Car brand", 
      category_id: "category_id"
    });
    
    await expect(
      createCarUseCase.execute({ 
        name: "Car2", 
        description: "Car description", 
        daily_rate: 100, 
        license_plate: "ABC-1234", 
        fine_amount: 60, 
        brand: "Car brand", 
        category_id: "category_id"
      })
    ).rejects.toEqual(new AppError('This car already exists'));
  });

  it("Should be able to create a new car with its available attribute as true", async () => {
    const car = await createCarUseCase.execute({ 
      name: "Car3", 
      description: "Car description", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Car brand", 
      category_id: "category_id"
    });

    expect(car.available).toBe(true);
  })
})