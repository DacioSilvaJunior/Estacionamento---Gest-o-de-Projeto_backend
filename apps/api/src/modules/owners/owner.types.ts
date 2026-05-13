import { z } from 'zod';
import { createOwnerSchema, updateOwnerSchema } from './owner.schema';

export type CreateOwnerInput = z.infer<typeof createOwnerSchema>['body'];
export type UpdateOwnerInput = z.infer<typeof updateOwnerSchema>['body'];