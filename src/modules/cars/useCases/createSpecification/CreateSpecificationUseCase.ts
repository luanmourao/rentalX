import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    // eslint-disable-next-line prettier/prettier
    const specificationAlreadyExists = this.specificationsRepository.findBYName(name);
    
    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    this.specificationsRepository.create({
      name,
      description
    });
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CreateSpecificationUseCase };
