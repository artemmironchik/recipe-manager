import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

import { RoutePath } from '@/enums';
import { getURL } from '@/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const host = getURL();

  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect_to')?.toString() || RoutePath.Recipes;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (redirectTo) {
        return NextResponse.redirect(`${host}${redirectTo}`);
      }

      return NextResponse.redirect(`${host}${RoutePath.Recipes}`);
    }
  }

  return NextResponse.redirect(`
    ${host}${RoutePath.SignIn}?error=${encodeURIComponent('Could not login with provider')}
  `);
}
