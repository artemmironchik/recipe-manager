import { FC } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

interface IconButtonProps extends ButtonProps {
  icon: JSX.Element;
}

export const IconButton: FC<IconButtonProps> = ({ icon, ...rest }) => (
  <Button variant="outline" size="icon" {...rest}>
    {icon}
  </Button>
);
