import { Category } from '../../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date()
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    // eslint-disable-next-line no-shadow
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CategoriesRepository };
