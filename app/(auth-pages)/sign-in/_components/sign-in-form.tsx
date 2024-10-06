'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';

import { signInAction } from '@/app/auth/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ButtonLoading } from '@/components/loading-button';
import { FormMessage as CustomFormMessage } from '@/components/form-message';

import { Message, SignInParams } from '@/types';
import { signInSchema } from '@/schemas';

interface SignInFormProps {
  searchParams: Message;
}

export const SignInForm: FC<SignInFormProps> = ({ searchParams }) => {
  const {
    execute: signIn,
    result: signInResult,
    isExecuting: isSignInExecuting,
  } = useAction(signInAction);

  const methods = useForm<SignInParams>({ resolver: zodResolver(signInSchema) });

  const errors = signInResult.validationErrors
    ? Object.values(signInResult.validationErrors).filter(Boolean)
    : [];

  const onSubmit = async (data: SignInParams) => {
    signIn(data);

    methods.reset(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            control={methods.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input placeholder="you@example.com" required hasError={!!error} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={methods.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" hasError={!!error} required {...field} />
                </FormControl>

                <FormMessage className="w-fit" />
              </FormItem>
            )}
          />
        </div>

        {'error' in searchParams && <CustomFormMessage message={searchParams} />}

        {!!errors.length &&
          errors.map((value) => <CustomFormMessage key={value[0]} message={{ error: value[0] }} />)}

        {isSignInExecuting ? (
          <ButtonLoading className="w-full" />
        ) : (
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        )}
      </form>
    </Form>
  );
};
