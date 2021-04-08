import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase; 
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => { 
    // teste pendente pois precisamos criar um car com available == true
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5000",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by their name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5090",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5000",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5777",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    const cars = await listCarsUseCase.execute({ name: "Car2" });

    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by their category name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5090",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5000",
      fine_amount: 200.00,
      brand: "Car brand2",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5777",
      fine_amount: 200.00,
      brand: "Car brand3",
      category_id: "hahaha"
    });

    await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5777",
      fine_amount: 200.00,
      brand: "Car brand4",
      category_id: "sjaisjjai"
    });

    const cars = await listCarsUseCase.execute({ category_id: "hahaha" });

    console.log(cars);

    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by their brand name", async () => {
    await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5090",
      fine_amount: 200.00,
      brand: "Car brand",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5000",
      fine_amount: 200.00,
      brand: "Car brand2",
      category_id: "category_id"
    });

    await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5777",
      fine_amount: 200.00,
      brand: "Car brand3",
      category_id: "hahaha"
    });

    await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 300.00,
      license_plate: "DEF-5777",
      fine_amount: 200.00,
      brand: "Car brand4",
      category_id: "sjaisjjai"
    });

    const cars = await listCarsUseCase.execute({ brand: "Car brand4" });

    expect(cars.length).toBe(1);
  });

})