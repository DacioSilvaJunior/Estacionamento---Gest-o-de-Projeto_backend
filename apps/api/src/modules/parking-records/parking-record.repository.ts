import { prisma } from '../../database/prisma';

export class ParkingRecordRepository {
  async findOpenRecordByVehicleId(vehicleId: string) {
    return prisma.parkingRecord.findFirst({
      where: {
        vehicleId,
        exitAt: null,
      },
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
    });
  }

  async createEntry(vehicleId: string, notes?: string | null) {
    return prisma.parkingRecord.create({
      data: {
        vehicleId,
        notes: notes || null,
      },
      include: {
        vehicle: {
          include: {
            owner: true,
          },
        },
      },
    });
  }
}