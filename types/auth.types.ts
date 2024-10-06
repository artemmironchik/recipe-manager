import { z } from 'zod';

import { signInSchema, signUpSchema } from '@/schemas';

export type SignInParams = z.infer<typeof signInSchema>;
export type SignUpParams = z.infer<typeof signUpSchema>;
