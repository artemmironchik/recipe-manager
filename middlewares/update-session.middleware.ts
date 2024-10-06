import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import { RoutePath } from '@/enums';

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const user = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith(RoutePath.Recipes) && user.error) {
    return NextResponse.redirect(new URL(RoutePath.SignIn, request.url));
  }

  if (request.nextUrl.pathname === RoutePath.Home) {
    if (user.error) {
      return NextResponse.redirect(new URL(RoutePath.SignIn, request.url));
    }

    return NextResponse.redirect(new URL(RoutePath.Recipes, request.url));
  }

  if (
    user &&
    [RoutePath.SignIn, RoutePath.SignUp].includes(request.nextUrl.pathname as RoutePath)
  ) {
    return NextResponse.redirect(new URL(RoutePath.Recipes, request.url));
  }

  return response;
};
