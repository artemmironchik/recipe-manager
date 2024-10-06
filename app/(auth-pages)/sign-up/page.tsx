import { FC } from 'react';

import { FormMessage } from '@/components/form-message';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { Message } from '@/types';
import { SignUpForm } from './_components/sign-up-form';

interface SignUpProps {
  searchParams: Message;
}

const Signup: FC<SignUpProps> = ({ searchParams }) => {
  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-sm justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>

        <CardDescription>Enter your information to start using application</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <SignUpForm searchParams={searchParams} />
      </CardContent>
    </Card>
  );
};

export default Signup;
