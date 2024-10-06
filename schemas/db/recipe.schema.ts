import { z } from 'zod';
import { dbSchema } from './db.schema';

export const recipeSchema = dbSchema
  .extend({
    title: z.string().min(1, 'The title is required').max(100, 'The title is too long'),
    description: z
      .string()
      .min(1, 'The description is required')
      .max(200, 'The description is too long'),
    image_url: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    cook_time: z.string().optional(),
    tags: z.array(z.string()).default([]),
    user_id: z.string(),
  })
  .strict();
