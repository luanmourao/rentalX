import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findBYName(name: string): Specification;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
