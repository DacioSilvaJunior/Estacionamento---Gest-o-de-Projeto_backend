import { Request, Response } from 'express';
import { ParkingRecordService } from './parking-record.service';

const parkingRecordService = new ParkingRecordService();

export class ParkingRecordController {
  async createEntry(request: Request, response: Response): Promise<void> {
    const record = await parkingRecordService.createEntry(request.body);

    response.status(201).json(record);
  }
}