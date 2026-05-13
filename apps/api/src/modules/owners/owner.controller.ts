import { Request, Response } from 'express';
import { OwnerService } from './owner.service';

const ownerService = new OwnerService();

export class OwnerController {
  async create(request: Request, response: Response): Promise<void> {
    const owner = await ownerService.create(request.body);

    response.status(201).json(owner);
  }

  async findMany(request: Request, response: Response): Promise<void> {
    const owners = await ownerService.findMany();

    response.json(owners);
  }

  async findById(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const owner = await ownerService.findById(id);

    response.json(owner);
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const owner = await ownerService.update(id, request.body);

    response.json(owner);
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    await ownerService.delete(id);

    response.status(204).send();
  }
}