import { FC } from 'react';

import { signUpAction } from '@/app/auth/actions';

import { FormMessage } from '@/components/form-message';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { Message } from '@/types';

interface SignUpProps {
  searchParams: Message;
}

const Signup: FC<SignUpProps> = ({ searchParams }) => {
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>

        <CardDescription>Enter your information to start using application</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <form id="signup-form" className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">First name</Label>

            <Input type="firstName" name="firstName" placeholder="Enter first name" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Last name</Label>

            <Input type="lastName" name="lastName" placeholder="Enter last name" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <Input name="email" placeholder="you@example.com" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>

            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              minLength={6}
              required
            />
          </div>

          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
        </form>

        <FormMessage message={searchParams} />
      </CardContent>
    </Card>
  );
};

export default Signup;
