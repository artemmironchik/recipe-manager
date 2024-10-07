'use server';

import { redirect } from 'next/navigation';
import { flattenValidationErrors } from 'next-safe-action';

import { authActionClient } from '@/lib/safe-action';
import { prisma } from '@/lib/prisma';

import { idSchema, updateRecipeSchema } from '@/schemas';
import { Bucket, RoutePath } from '@/enums';
import { encodedRedirect } from '@/utils';
import { createClient } from '@/utils/supabase/server';

export const updateRecipeAction = authActionClient
  .schema(updateRecipeSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const {
      image_url: imageUrl,
      tags = '',
      ingredients = '',
      instructions = '',
      id,
      ...rest
    } = parsedInput;
    const {
      user: { user },
    } = ctx;

    const supabase = createClient();

    try {
      await prisma.recipe.update({
        where: { id },
        data: {
          ...rest,
          tags: tags?.split(',').map((tag: string) => tag.trim()),
          ingredients: ingredients?.split(',').map((ing: string) => ing.trim()),
          instructions: instructions?.split('\n').map((inst: string) => inst.trim()),
          ...(imageUrl && { image_url: `${process.env.STORAGE_ENDPOINT}/${imageUrl}` }),
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      const fileName = imageUrl?.split('recipes/').pop();

      if (fileName) {
        await supabase.storage.from(Bucket.RECIPES).remove([`${user?.id}/${fileName}`]);
      }

      return encodedRedirect(
        'error',
        `${RoutePath.Recipes}/${id}/edit`,
        "Couldn't update a recipe",
      );
    }

    return redirect(RoutePath.Recipes);
  });

export const deleteRecipeAction = authActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id } }) => {
    try {
      await prisma.recipe.delete({
        where: { id },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return encodedRedirect('error', `${RoutePath.Recipes}/${id}`, "Couldn't delete a recipe");
    }

    return redirect(RoutePath.Recipes);
  });
