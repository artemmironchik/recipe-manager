import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import { createClient } from '@/utils/supabase/server';

import { getFullName } from '@/utils';

import { RecipeInfo } from './_components/recipe-info';

const RecipePage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id },
    include: {
      profile: true,
    },
  });

  if (!recipe) {
    notFound();
  }

  const getUserFullName = () => {
    const { profile } = recipe;

    if (profile.first_name || profile.last_name) {
      return (profile.first_name || '') + (profile.last_name || '');
    }

    return getFullName(user) || 'No name';
  };

  return (
    <div className="container mx-auto py-8">
      <RecipeInfo
        recipe={{ ...recipe, userFullName: getUserFullName() }}
        isPublic={recipe.user_id !== user?.id}
      />
    </div>
  );
};

export default RecipePage;
