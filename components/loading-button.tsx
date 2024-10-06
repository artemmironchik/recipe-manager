import { FC } from 'react';
import { Loader2 } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

interface ButtonLoadingProps extends ButtonProps {
  text?: string;
}

export const ButtonLoading: FC<ButtonLoadingProps> = ({ text = 'Please wait', ...rest }) => (
  <Button {...rest} disabled>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

    {text}
  </Button>
);
