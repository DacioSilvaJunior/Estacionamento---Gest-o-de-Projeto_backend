import cors from 'cors';
import express from 'express';
import { ownerRoutes } from './modules/owners/owner.routes';
import { parkingRecordRoutes } from './modules/parking-records/parking-record.routes';
import { errorHandler } from './shared/middlewares/errorHandler';


export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (request, response) => {
  return response.json({
    status: 'ok',
    message: 'Parking Register API is running',
  });
});

app.use('/owners', ownerRoutes);
app.use('/parking-records', parkingRecordRoutes);

app.use(errorHandler);
import {vehicleRoutes}
from './modules/vehicles/vehicle.routes';

app.use(
'/vehicles',
vehicleRoutes
);