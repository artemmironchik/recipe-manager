import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

import { RoutePath } from '@/enums';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect_to')?.toString() || RoutePath.Recipes;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (redirectTo) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }

      return NextResponse.redirect(`${origin}${RoutePath.Recipes}`);
    }
  }

  return NextResponse.redirect(`
    ${origin}${RoutePath.SignIn}?error=${encodeURIComponent('Could not login with provider')}
  `);
}
