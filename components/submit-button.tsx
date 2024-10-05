'use client';

import { FC, type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  pendingText?: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  pendingText = 'Submitting...',
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
};
