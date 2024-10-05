'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();

  const supabase = createClient();
  const origin = headers().get('origin');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error(`${error.code} ${error.message}`);

    return encodedRedirect('error', '/sign-up', error.message);
  }
  return encodedRedirect('success', '/sign-up', 'Thanks for signing up!');
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/protected');
};

export const signOutAction = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  return redirect('/sign-in');
};
