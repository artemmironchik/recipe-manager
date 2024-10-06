import { z } from 'zod';

import { createRecipeSchema, recipeSchema, updateRecipeSchema } from '@/schemas';

export type Recipe = z.infer<typeof recipeSchema>;
export type ExtendedRecipe = Recipe & {
  userFullName: string;
};

export type CreateRecipeParams = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeParams = z.infer<typeof updateRecipeSchema>;
