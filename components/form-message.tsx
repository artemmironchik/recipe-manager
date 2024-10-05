import { FC } from 'react';

import { Message } from '@/types';

interface FormMessageProps {
  message: Message;
}

export const FormMessage: FC<FormMessageProps> = ({ message }) => (
  <div className="flex flex-col gap-2 w-full max-w-md text-sm">
    {'success' in message && (
    <div className="text-green-500 border-l-2 border-green-500 px-4">{message.success}</div>
    )}

    {'error' in message && (
    <div className="text-red-500 border-l-2 border-red-500 px-4">{message.error}</div>
    )}

    {'message' in message && (
    <div className="text-foreground border-l-2 border-foreground px-4">{message.message}</div>
    )}
  </div>
);
