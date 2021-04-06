import { getRepository, Repository } from 'typeorm';
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository';
import { Category } from '../entities/Category';


class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  // estava "private" na abordagem anterior
  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    // INSERT INTO categories (description, name) VALUES (description, name )
    const category = this.repository.create({
      description,
      name
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    // SELECT * FROM categories 
    const categories = await this.repository.find();
    
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    // SELECT * FROM categories WHERE name = "name" LIMIT 1
    const category = await this.repository.findOne({ name });

    return category;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CategoriesRepository };
