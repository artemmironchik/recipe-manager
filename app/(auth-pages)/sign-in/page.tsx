import { FC } from 'react';
import Link from 'next/link';

import { signInAction } from '@/app/auth/actions';

import { OAuthButtons } from '@/components/oauth-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { RoutePath } from '@/enums';
import { Message } from '@/types';

interface LoginProps {
  searchParams: Message;
}

const Login: FC<LoginProps> = ({ searchParams }) => (
  <Card className="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">Sign in</CardTitle>

      <CardDescription>Enter your email to sign in to your account</CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>

          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>

          <Input minLength={6} name="password" id="password" type="password" required />
        </div>

        {'error' in searchParams && (
          <div className="text-sm font-medium text-destructive">{searchParams.error}</div>
        )}

        <Button formAction={signInAction} className="w-full">
          Sign in
        </Button>
      </form>

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
