'use server';

import { redirect } from 'next/navigation';
import { Provider } from '@supabase/supabase-js';

import { encodedRedirect, getURL } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';

import { RoutePath } from '@/enums';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();

  const supabase = createClient();

  if (!email || !password || !firstName || !lastName) {
    return { error: 'All parameters are required' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    // eslint-disable-next-line no-console
    console.error(`${error.code} ${error.message}`);

    return encodedRedirect('error', RoutePath.SignUp, error.message);
  }

  return encodedRedirect('success', RoutePath.SignUp, 'Thanks for signing up!');
};

export const oAuthSignInAction = async (provider: Provider) => {
  if (!provider) {
    return encodedRedirect('error', RoutePath.SignUp, 'No provider selected');
  }

  const supabase = createClient();
  const redirectUrl = getURL('/auth/callback');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    return encodedRedirect('error', RoutePath.SignUp, 'Could not authenticate user');
  }

  return redirect(data.url);
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
    return encodedRedirect('error', RoutePath.SignIn, error.message);
  }

  return redirect(RoutePath.Protected);
};

export const signOutAction = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  return redirect(RoutePath.SignIn);
};
