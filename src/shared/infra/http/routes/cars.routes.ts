import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ensureAdminUser } from "../middlewares/ensureAdminUser";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdminUser, createCarController.handle);

export { carsRoutes };