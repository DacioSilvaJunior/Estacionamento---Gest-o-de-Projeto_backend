import { prisma } from '../../database/prisma';

class VehicleService {

  async create(data:{
    plate:string;
    model?:string;
    color?:string;
    ownerId:string;
  }){

    const owner = await prisma.owner.findUnique({
      where:{
        id:data.ownerId
      }
    });

    if(!owner){
      throw new Error("Dono não encontrado");
    }

    return prisma.vehicle.create({
      data
    });

  }

  async findByPlate(plate:string){

    return prisma.vehicle.findUnique({

      where:{
        plate
      },

      include:{
        owner:true
      }

    });

  }

  async list(){

    return prisma.vehicle.findMany({

      include:{
        owner:true
      }

    });

  }

}

export default new VehicleService();