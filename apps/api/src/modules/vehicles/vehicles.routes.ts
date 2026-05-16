import { Router } from 'express';
import vehicleController from './vehicle.controller';

const router=Router();

router.post(
'/',
vehicleController.create
);

router.get(
'/',
vehicleController.list
);

router.get(
'/:plate',
vehicleController.find
);

export {router as vehicleRoutes};