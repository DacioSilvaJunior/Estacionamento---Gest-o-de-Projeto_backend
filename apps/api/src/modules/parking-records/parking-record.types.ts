import { z } from 'zod';
import { createEntrySchema } from './parking-record.schema';

export type CreateEntryInput = z.infer<typeof createEntrySchema>['body'];