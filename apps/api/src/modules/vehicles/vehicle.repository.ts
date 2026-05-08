import { prisma } from '../../database/prisma';

export class VehicleRepository {
  async findByPlate(plate: string) {
    return prisma.vehicle.findUnique({
      where: {
        plate,
      },
      include: {
        owner: true,
      },
    });
  }
}