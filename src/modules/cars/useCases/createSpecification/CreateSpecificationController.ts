import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationUseCase.execute({ name, description });

    return res.status(201).send('Specification created');
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CreateSpecificationController };
