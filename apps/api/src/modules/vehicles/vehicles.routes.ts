import { Router } from 'express';
import vehicleController from './vehicles.controller';

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