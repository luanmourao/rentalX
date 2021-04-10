import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase; 
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory, 
      specificationsRepositoryInMemory
    );
  })

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name", 
      description: "Car description", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Car brand", 
      category_id: "category_id"
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test description",
      name: "test name description"
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      description: "test description2",
      name: "test name description2"
    });

    const specifications_id = [specification.id, specification2.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(2);
  });

  it("should not be able to add a new specification to a non existing car", async () => {
    return expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];
  
      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  })

})