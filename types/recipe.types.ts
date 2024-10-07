import { z } from 'zod';

import {
  createRecipeSchema,
  recipeSchema,
  updateRecipeFormSchema,
  updateRecipeSchema,
} from '@/schemas';

export type Recipe = z.infer<typeof recipeSchema>;
export type ExtendedRecipe = Recipe & {
  userFullName: string;
};

export type CreateRecipeParams = z.infer<typeof createRecipeSchema>;
export type CreateRecipeFormParams = z.infer<typeof updateRecipeFormSchema>;
export type UpdateRecipeParams = z.infer<typeof updateRecipeSchema>;
export type UpdateRecipeFormParams = z.infer<typeof updateRecipeFormSchema>;

export type RecipeQuery = {
  query?: string;
  ing?: string;
  tag?: string;
};
