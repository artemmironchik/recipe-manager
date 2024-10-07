'use server';

import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';

import { authActionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

import { createRecipeSchema } from '@/schemas';
import { Bucket, RoutePath } from '@/enums';
import { encodedRedirect } from '@/utils';
import { createClient } from '@/utils/supabase/server';

export const createRecipeAction = authActionClient
  .schema(createRecipeSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { image_url: imageUrl, tags, ingredients, instructions, ...rest } = parsedInput;
    const {
      user: { user },
    } = ctx;

    const supabase = createClient();

    try {
      await prisma.recipe.create({
        data: {
          ...rest,
          tags: tags?.split(',').map((tag) => tag.trim()),
          ingredients: ingredients.split(',').map((ing) => ing.trim()),
          instructions: instructions.split('\n').map((inst) => inst.trim()),
          image_url: `${process.env.STORAGE_ENDPOINT}/${imageUrl}`,
          user_id: user.id,
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      const fileName = imageUrl.split('recipes/').pop();

      await supabase.storage.from(Bucket.RECIPES).remove([`${user?.id}/${fileName}`]);

      return encodedRedirect('error', RoutePath.CreateRecipe, "Couldn't create a recipe");
    }

    return redirect(RoutePath.Recipes);
  });
