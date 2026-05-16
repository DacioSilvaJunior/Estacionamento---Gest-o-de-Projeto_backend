import { Request,Response } from 'express';
import vehicleService from './vehicles.service';

class VehicleController{

async create(req:Request,res:Response){

const vehicle=
await vehicleService.create(req.body);

return res.status(201).json(vehicle);

}

async list(req:Request,res:Response){

const vehicles=
await vehicleService.list();

return res.json(vehicles);

}

async find(req:Request,res:Response){

const vehicle=
await vehicleService.findByPlate(
req.params.plate
);

return res.json(vehicle);

}

}

export default new VehicleController();