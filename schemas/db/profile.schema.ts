import { z } from 'zod';

export const profileSchema = z
  .object({
    id: z.string(),

    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
  })
  .strict();
