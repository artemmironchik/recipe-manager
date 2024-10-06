import { FC } from 'react';
import Link from 'next/link';

import { OAuthButtons } from '@/components/oauth-buttons';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { RoutePath } from '@/enums';
import { Message } from '@/types';

import { SignInForm } from './_components/sign-in-form';

interface LoginProps {
  searchParams: Message;
}

const Login: FC<LoginProps> = ({ searchParams }) => (
  <Card className="mx-auto max-w-sm w-full">
    <CardHeader>
      <CardTitle className="text-2xl">Sign in</CardTitle>

      <CardDescription>Enter your email to sign in to your account</CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      <SignInForm searchParams={searchParams} />

      <OAuthButtons />

      <div className="text-center">
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-foreground font-medium underline" href={RoutePath.SignUp}>
            Sign up
          </Link>
        </p>
      </div>
    </CardContent>
  </Card>
);

export default Login;
