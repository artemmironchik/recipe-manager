import { createClient } from '@/utils/supabase/server';

import { ThemeSwitcher } from '@/components/theme-switcher';

import { getFullName } from '@/utils';

import { HeaderAuthButtons } from './header-auth-buttons';

const HeaderAuth = async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {getFullName(user)}!
      <HeaderAuthButtons isAuthorized />
      <ThemeSwitcher />
    </div>
  ) : (
    <div className="flex gap-2">
      <HeaderAuthButtons />

      <ThemeSwitcher />
    </div>
  );
};

export default HeaderAuth;
