import { Specification } from '../../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date()
    });

    this.specifications.push(specification);
  }

  findBYName(name: string): Specification {
    // eslint-disable-next-line prettier/prettier
    const specification = this.specifications.find((spec) => spec.name === name);

    return specification;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { SpecificationRepository };
