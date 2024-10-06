import { createSafeActionClient } from 'next-safe-action';

import { createClient } from '@/utils/supabase/server';

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("You're not authorized.");
  }

  return next({ ctx: { user } });
});
