import { z } from 'zod';

export const dbSchema = z
  .object({
    id: z.string(),

    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    deleted_at: z.coerce.date().optional().nullable(),
  })
  .strict();
