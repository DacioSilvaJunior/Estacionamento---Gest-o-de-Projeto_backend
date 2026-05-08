import { z } from 'zod';

export const createOwnerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Owner name is required'),
    document: z.string().trim().optional().nullable(),
    phone: z.string().trim().optional().nullable(),
  }),
});

export const updateOwnerSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Owner id is required'),
  }),
  body: z.object({
    name: z.string().trim().min(1, 'Owner name is required').optional(),
    document: z.string().trim().optional().nullable(),
    phone: z.string().trim().optional().nullable(),
  }),
});

export const ownerIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Owner id is required'),
  }),
});