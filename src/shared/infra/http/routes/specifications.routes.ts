import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', ensureAuthenticated, ensureAdminUser, createSpecificationController.handle);

export { specificationsRoutes };
