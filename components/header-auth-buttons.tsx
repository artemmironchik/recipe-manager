'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RoutePath } from '@/enums';

import { Button } from './ui/button';

export const HeaderAuthButtons = () => {
  const pathname = usePathname();

  return (
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
