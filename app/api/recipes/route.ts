import { getFullName } from '@/utils';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-static';

export async function GET() {
  const supabase = createClient();

  const recipes = await prisma?.recipe.findMany({
    include: {
      profile: true,
    },
  });

  if (!recipes?.length) return Response.json({ data: [] });

  const mappedRecipes = recipes.map(async (recipe) => {
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
  });

  return Response.json({ data: mappedRecipes });
}
