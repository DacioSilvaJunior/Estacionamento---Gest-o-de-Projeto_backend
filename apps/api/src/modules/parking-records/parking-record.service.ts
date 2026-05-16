import { prisma } from '../../shared/database/prisma';
import { AppError } from '../../shared/errors/AppError';

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

throw new AppError(
'Veículo não encontrado',
404
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

throw new AppError(
'Veículo já estacionado',
400
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

throw new AppError(
'Registro não encontrado',
404
);

}

if(record.exitAt){

throw new AppError(
'Veículo já saiu',
400
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

}

export default new ParkingRecordService();