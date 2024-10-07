import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { RecipeForm } from '@/components/recipe-form';

import { RoutePath } from '@/enums';

const CreateRecipePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(RoutePath.SignIn);
  }

  return (
    <div className="container flex justify-center flex-1 gap-4 mx-auto py-8">
      <RecipeForm />
    </div>
  );
};

export default CreateRecipePage;
