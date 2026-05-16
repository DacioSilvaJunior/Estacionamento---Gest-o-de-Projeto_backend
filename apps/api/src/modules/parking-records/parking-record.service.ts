import { AppError } from '../../shared/errors/AppError';
import { normalizePlate } from '../../shared/utils/normalizePlate';
import { VehicleRepository } from '../vehicles/vehicle.repository';
import { ParkingRecordRepository } from './parking-record.repository';
import { CreateEntryInput } from './parking-record.types';


class ParkingRecordService {

async registerEntry(
plate:string
){

const vehicle=
await prisma.vehicle.findUnique({

where:{
plate
}

});

if(!vehicle){

throw new Error(
"Veículo não encontrado"
);

}

const activeRecord=
await prisma.parkingRecord.findFirst({

where:{
vehicleId:vehicle.id,
exitAt:null
}

});

if(activeRecord){

throw new Error(
"Veículo já está estacionado"
);

}

return prisma.parkingRecord.create({

data:{
vehicleId:vehicle.id
}

});

}


async registerExit(
recordId:string
){

const record=
await prisma.parkingRecord.findUnique({

where:{
id:recordId
}

});

if(!record){

throw new Error(
"Registro não encontrado"
);

}

return prisma.parkingRecord.update({

where:{
id:recordId
},

data:{
exitAt:new Date()
}

});

}

async history(){

return prisma.parkingRecord.findMany({

include:{

vehicle:{

include:{
owner:true
}

}

}

});

}

async search(
plate?:string,
name?:string
){

return prisma.parkingRecord.findMany({

where:{

vehicle:{

plate:plate,

owner:{

name:{
contains:name
}

}

}

},

include:{

vehicle:{
include:{
owner:true
}
}

}

});

}

}

export default new ParkingRecordService();
import {Request,Response} from 'express';
import parkingService from './parking-record.service';

class ParkingRecordController{

async entry(req:Request,res:Response){

const result=
await parkingService.registerEntry(
req.body.plate
);

return res.json(result);

}

async exit(req:Request,res:Response){

const result=
await parkingService.registerExit(
req.params.id
);

return res.json(result);

}

async history(
req:Request,
res:Response
){

const result=
await parkingService.history();

return res.json(result);

}

async search(
req:Request,
res:Response
){

const result=
await parkingService.search(

req.query.plate as string,
req.query.name as string

);

return res.json(result);

}

}

export default new ParkingRecordController();