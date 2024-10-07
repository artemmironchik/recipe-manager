'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { signOutAction } from '@/app/auth/actions';

import { RoutePath } from '@/enums';

import { Button } from './ui/button';

interface HeaderAuthButtonsProps {
  isAuthorized?: boolean;
}

export const HeaderAuthButtons: FC<HeaderAuthButtonsProps> = ({ isAuthorized }) => {
  const pathname = usePathname();

  return isAuthorized ? (
    <>
      {pathname !== RoutePath.CreateRecipe && (
        <Link href={RoutePath.CreateRecipe}>
          <Button>Create Recipe</Button>
        </Link>
      )}

      <Button onClick={() => signOutAction()} variant="outline">
        Sign out
      </Button>
    </>
  ) : (
    <>
      {pathname !== RoutePath.SignIn && (
        <Button asChild size="sm" variant="outline">
          <Link href={RoutePath.SignIn}>Sign in</Link>
        </Button>
      )}

      {pathname !== RoutePath.SignUp && (
        <Button asChild size="sm" variant="default">
          <Link href={RoutePath.SignUp}>Sign up</Link>
        </Button>
      )}
    </>
  );
};
