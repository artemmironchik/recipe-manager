import { prisma } from '@/lib/prisma';

import { countOccurrences, getFullName } from '@/utils';
import { createClient } from '@/utils/supabase/server';

import { ExtendedRecipe } from '@/types';

import { RecipesFilters } from './_components/recipes-filters';
import { RecipesList } from './_components/recipes-list';

const RecipesPage = async () => {
  const supabase = createClient();

  const recipes = await prisma.recipe.findMany({
    include: {
      profile: true,
    },
  });

  const filters = await prisma.recipe.findMany({
    select: {
      ingredients: true,
      tags: true,
    },
  });

  const ingredients = countOccurrences(filters, 'ingredients');
  const tags = countOccurrences(filters, 'tags');

  const mappedRecipes: ExtendedRecipe[] = await Promise.all(
    (recipes || []).map(async (recipe) => {
      const { profile, ...rest } = recipe;

      if (profile.first_name || profile.last_name) {
        return {
          ...rest,
          userFullName: (profile.first_name || '') + (profile.last_name || ''),
        };
      }

      const {
        data: { user },
      } = await supabase.auth.admin.getUserById(recipe.user_id);

      return {
        ...rest,
        userFullName: getFullName(user) || 'No name',
      };
    }),
  );

  return (
    <div className="container flex flex-1 gap-4 mx-auto py-8">
      <RecipesFilters ingredients={ingredients} tags={tags} />

      <RecipesList recipes={mappedRecipes} />
    </div>
  );
};

export default RecipesPage;
