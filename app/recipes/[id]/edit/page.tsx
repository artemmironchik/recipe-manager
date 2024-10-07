import { FC } from 'react';
import { notFound, redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { createClient } from '@/utils/supabase/server';

import { RecipeForm } from '@/components/recipe-form';

import { RoutePath } from '@/enums';

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

const EditRecipePage: FC<EditRecipePageProps> = async ({ params }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    redirect(RoutePath.SignIn);
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container flex justify-center flex-1 gap-4 mx-auto py-8">
      <RecipeForm recipe={recipe} />
    </div>
  );
};

export default EditRecipePage;
