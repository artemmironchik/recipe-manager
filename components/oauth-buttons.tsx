'use client';

import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { oAuthSignInAction } from '@/app/auth/actions';

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export const OAuthButtons = () => {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
          onClick={async () => {
            await oAuthSignInAction(provider.name);
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
};
