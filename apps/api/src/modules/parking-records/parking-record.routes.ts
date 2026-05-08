import { Router } from 'express';
import { asyncHandler } from '../../shared/middlewares/asyncHandler';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { ParkingRecordController } from './parking-record.controller';
import { createEntrySchema } from './parking-record.schema';

const parkingRecordRoutes = Router();
const parkingRecordController = new ParkingRecordController();

parkingRecordRoutes.post(
  '/entry',
  validateRequest(createEntrySchema),
  asyncHandler(parkingRecordController.createEntry.bind(parkingRecordController)),
);

export { parkingRecordRoutes };