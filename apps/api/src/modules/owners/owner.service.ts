import { AppError } from '../../shared/errors/AppError';
import { CreateOwnerInput, UpdateOwnerInput } from './owner.types';
import { OwnerRepository } from './owner.repository';

export class OwnerService {
  constructor(private readonly ownerRepository = new OwnerRepository()) {}

  async create(data: CreateOwnerInput) {
    return this.ownerRepository.create({
      name: data.name.trim(),
      document: data.document?.trim() || null,
      phone: data.phone?.trim() || null,
    });
  }

  async findMany() {
    return this.ownerRepository.findMany();
  }

  async findById(id: string) {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new AppError('Owner not found', 404);
    }

    return owner;
  }

  async update(id: string, data: UpdateOwnerInput) {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new AppError('Owner not found', 404);
    }

    const updateData: UpdateOwnerInput = {};

    if (data.name !== undefined) {
      updateData.name = data.name.trim();
    }

    if (data.document !== undefined) {
      updateData.document = data.document?.trim() || null;
    }

    if (data.phone !== undefined) {
      updateData.phone = data.phone?.trim() || null;
    }

    return this.ownerRepository.update(id, updateData);
  }

  async delete(id: string) {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new AppError('Owner not found', 404);
    }

    return this.ownerRepository.delete(id);
  }
}