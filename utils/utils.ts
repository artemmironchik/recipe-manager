import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export const encodedRedirect = (type: 'error' | 'success', path: string, message: string) => redirect(`${path}?${type}=${encodeURIComponent(message)}`);

export const getURL = (path: string = '') => {
  // eslint-disable-next-line no-nested-ternary
  let url = process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL && process.env.VERCEL_URL.trim() !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000/';

  url = url.replace(/\/+$/, '');
  url = url.includes('http') ? url : `https://${url}`;
  const newPath = path.replace(/^\/+/, '');

  return newPath ? `${url}/${newPath}` : url;
};

export const getFullName = (user: User | null) => {
  if (!user) return '';

  const { identities } = user;

  if (!identities) return '';

  const emailProfile = identities.find(({ provider }) => provider === 'email');

  if (emailProfile) {
    const { identity_data: data } = emailProfile;

    return (data?.first_name || '') + (data?.last_name || '');
  }

  const githubProfile = identities.find(({ provider }) => provider === 'github');

  if (githubProfile) {
    const { identity_data: data } = githubProfile;

    return data?.full_name || data?.user_name;
  }

  return '';
};
