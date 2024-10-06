import { z } from 'zod';

export const profileSchema = z
  .object({
    id: z.string(),

    first_name: z.string().optional(),
    last_name: z.string().optional(),
  })
  .strict();
