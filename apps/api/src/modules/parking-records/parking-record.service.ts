import { AppError } from '../../shared/errors/AppError';
import { normalizePlate } from '../../shared/utils/normalizePlate';
import { VehicleRepository } from '../vehicles/vehicle.repository';
import { ParkingRecordRepository } from './parking-record.repository';
import { CreateEntryInput } from './parking-record.types';

export class ParkingRecordService {
  constructor(
    private readonly parkingRecordRepository = new ParkingRecordRepository(),
    private readonly vehicleRepository = new VehicleRepository(),
  ) {}

  async createEntry(data: CreateEntryInput) {
    const plate = normalizePlate(data.plate);

    if (!plate) {
      throw new AppError('Plate is required', 400);
    }

    const vehicle = await this.vehicleRepository.findByPlate(plate);

    if (!vehicle) {
      throw new AppError('Vehicle not found for this plate', 404);
    }

    const openRecord = await this.parkingRecordRepository.findOpenRecordByVehicleId(vehicle.id);

    if (openRecord) {
      throw new AppError('This vehicle already has an open entry', 409);
    }

    return this.parkingRecordRepository.createEntry(
      vehicle.id,
      data.notes?.trim() || null,
    );
  }
}