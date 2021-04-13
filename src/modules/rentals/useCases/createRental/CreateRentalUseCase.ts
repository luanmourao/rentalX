import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental>{

    const minHours = 24; // número de horas mínimas para o aluguel ser efetivado
    
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o mesmo veículo
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("This car is rented");
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel em aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There is a rental in process for this user, close it before register another");
    }
    
    // O aluguel deve ter duração mínima de 24 horas
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minHours) {
      throw new AppError("Invalid rental period, it should be 24 hours at least");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    return rental;
  }
}

export { CreateRentalUseCase };