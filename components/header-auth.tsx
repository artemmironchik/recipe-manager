import { signOutAction } from '@/app/auth/actions';

import { createClient } from '@/utils/supabase/server';

import { ThemeSwitcher } from '@/components/theme-switcher';

import { getFullName } from '@/utils/utils';
import { Button } from './ui/button';
import { HeaderAuthButtons } from './header-auth-buttons';

const AuthButton = async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {getFullName(user)}!
      <Button onClick={signOutAction} variant="outline">
        Sign out
      </Button>
      <ThemeSwitcher />
    </div>
  ) : (
    <div className="flex gap-2">
      <HeaderAuthButtons />

      <ThemeSwitcher />
    </div>
  );
};

export default AuthButton;
