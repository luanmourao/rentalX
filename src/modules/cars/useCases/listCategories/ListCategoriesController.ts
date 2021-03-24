import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const allCategories = this.listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { ListCategoriesController };
