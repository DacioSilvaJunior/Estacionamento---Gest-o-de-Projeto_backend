import { prisma } from '../../database/prisma';
import { CreateOwnerInput, UpdateOwnerInput } from './owner.types';

export class OwnerRepository {
  async create(data: CreateOwnerInput) {
    return prisma.owner.create({
      data: {
        name: data.name,
        document: data.document || null,
        phone: data.phone || null,
      },
    });
  }

  async findMany() {
    return prisma.owner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        vehicles: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.owner.findUnique({
      where: {
        id,
      },
      include: {
        vehicles: true,
      },
    });
  }

  async update(id: string, data: UpdateOwnerInput) {
    return prisma.owner.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.owner.delete({
      where: {
        id,
      },
    });
  }
}