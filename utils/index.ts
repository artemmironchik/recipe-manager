/* eslint-disable no-nested-ternary */

import { IdentityData, PrismaUser } from '@/types';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export const encodedRedirect = (type: 'error' | 'success', path: string, message: string) =>
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);

export const getURL = (path: string = '') => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000/';

  url = url.replace(/\/+$/, '');
  url = url.includes('http') ? url : `https://${url}`;
  const newPath = path.replace(/^\/+/, '');

  return newPath ? `${url}/${newPath}` : url;
};

export const getFullName = (user: User | PrismaUser | null) => {
  if (!user) return '';

  const { identities } = user;

  if (!identities) return '';

  const emailProfile = identities.find(({ provider }) => provider === 'email');

  if (emailProfile) {
    const { identity_data: data } = emailProfile;

    return ((data as IdentityData)?.first_name || '') + ((data as IdentityData)?.last_name || '');
  }

  const githubProfile = identities.find(({ provider }) => provider === 'github');

  if (githubProfile) {
    const { identity_data: data } = githubProfile;

    return (data as IdentityData)?.full_name || (data as IdentityData)?.user_name;
  }

  return '';
};

export const countOccurrences = (data: any, field: string) => {
  if (!data) return {};

  const counts: Record<string, number> = {};

  data.forEach((item: any) => {
    item[field].forEach((value: string) => {
      counts[value] = counts[value] ? counts[value] + 1 : 1;

      return value;
    });

    return item;
  });

  return counts;
};
