import { FC } from 'react';

import { prisma } from '@/lib/prisma';

import { Prisma } from '@prisma/client';

import { countOccurrences, getFullName } from '@/utils';

import { ExtendedRecipe, PrismaUser, RecipeQuery } from '@/types';

import { RecipesFilters } from './_components/recipes-filters';
import { RecipesList } from './_components/recipes-list';

interface RecipesPageProps {
  searchParams: RecipeQuery;
}

const RecipesPage: FC<RecipesPageProps> = async ({ searchParams }) => {
  const buildQuery = () => {
    let query: Prisma.RecipeWhereInput = {};

    if (searchParams.query) {
      query = {
        title: {
          contains: searchParams.query,
        },
      };
    }

    if (searchParams.ing) {
      query = {
        ...query,
        ingredients: {
          hasSome: searchParams.ing.split(','),
        },
      };
    }

    if (searchParams.tag) {
      query = {
        ...query,
        tags: {
          hasSome: searchParams.tag.split(','),
        },
      };
    }

    return Object.keys(query).length ? query : undefined;
  };

  const recipes = await prisma.recipe.findMany({
    where: buildQuery(),
    include: {
      profile: {
        include: {
          user: {
            include: {
              identities: true,
            },
          },
        },
      },
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

      return {
        ...rest,
        userFullName: getFullName(profile.user as PrismaUser) || 'No name',
      };
    }),
  );

  return (
    <div className="container flex flex-1 gap-4 mx-auto py-8">
      <RecipesFilters searchParams={searchParams} ingredients={ingredients} tags={tags} />

      <RecipesList searchParams={searchParams} recipes={mappedRecipes} />
    </div>
  );
};

export default RecipesPage;
