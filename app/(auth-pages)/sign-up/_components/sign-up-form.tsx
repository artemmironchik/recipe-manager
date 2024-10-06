'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';

import { signUpAction } from '@/app/auth/actions';

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

import { Message, SignUpParams } from '@/types';
import { signUpSchema } from '@/schemas';

interface SignUpFormProps {
  searchParams: Message;
}

export const SignUpForm: FC<SignUpFormProps> = ({ searchParams }) => {
  const {
    execute: signUp,
    result: signUpResult,
    isExecuting: isSignUpExecuting,
  } = useAction(signUpAction);

  const methods = useForm<SignUpParams>({ resolver: zodResolver(signUpSchema) });

  const errors = signUpResult.validationErrors
    ? Object.values(signUpResult.validationErrors).filter(Boolean)
    : [];

  const onSubmit = async (data: SignUpParams) => {
    signUp(data);

    methods.reset(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            control={methods.control}
            name="first_name"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>

                <FormControl>
                  <Input placeholder="Your name" required hasError={!!error} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={methods.control}
            name="last_name"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>

                <FormControl>
                  <Input placeholder="Your last name" required hasError={!!error} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" required {...field} />
                </FormControl>

                <FormMessage className="w-fit" />
              </FormItem>
            )}
          />
        </div>

        {'error' in searchParams && <CustomFormMessage message={searchParams} />}

        {!!errors.length &&
          errors.map((value) => <CustomFormMessage key={value[0]} message={{ error: value[0] }} />)}

        {isSignUpExecuting ? (
          <ButtonLoading className="w-full" />
        ) : (
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        )}
      </form>
    </Form>
  );
};
