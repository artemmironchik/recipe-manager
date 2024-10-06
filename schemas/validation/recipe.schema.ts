import { recipeSchema } from '../db/recipe.schema';

export const createRecipeSchema = recipeSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
});

export const updateRecipeSchema = createRecipeSchema.optional();
