import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  
  rentals: Rental[] = [];
  
  async findOpenRentalByCar(car_id: string): Promise<Rental> {

    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }
  
  async findOpenRentalByUser(user_id: string): Promise<Rental> {

    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }
  
}

export { RentalsRepositoryInMemory };