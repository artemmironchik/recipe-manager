import { z } from 'zod';

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';

import { recipeSchema } from '../db/recipe.schema';
import { idSchema } from '../common/index.schema';

export const createRecipeSchema = recipeSchema
  .pick({
    title: true,
    description: true,
    cook_time: true,
    image_url: true,
  })
  .extend({
    tags: z.string().optional(),
    instructions: z.string(),
    ingredients: z.string(),
  });

export const updateRecipeSchema = createRecipeSchema.merge(idSchema).partial();

export const createRecipeFormSchema = createRecipeSchema.extend({
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 3MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
});

export const updateRecipeFormSchema = createRecipeFormSchema.partial();
