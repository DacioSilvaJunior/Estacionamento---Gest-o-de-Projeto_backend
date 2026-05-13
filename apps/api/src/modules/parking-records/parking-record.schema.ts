import { z } from 'zod';

export const createEntrySchema = z.object({
  body: z.object({
    plate: z.string().trim().min(1, 'Plate is required'),
    notes: z.string().trim().optional().nullable(),
  }),
});