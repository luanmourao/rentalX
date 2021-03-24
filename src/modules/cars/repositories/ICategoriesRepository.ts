import { Category } from '../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

// eslint-disable-next-line import/prefer-default-export
export { ICategoriesRepository, ICreateCategoryDTO };
