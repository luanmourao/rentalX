import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

// eslint-disable-next-line import/prefer-default-export
export { importCategoryController };
