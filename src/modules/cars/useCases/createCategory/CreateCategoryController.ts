import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  // constructor inutilizado na abordagem da injeção de dependência com o tsyringe
  // constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return res.status(201).send('Category created');
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CreateCategoryController };
