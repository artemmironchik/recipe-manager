import { z } from 'zod';

import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants';

export const signInSchema = z.object({
  email: z.string().trim().regex(EMAIL_REGEX, 'Email format is incorrect.').toLowerCase(),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
    ),
});

export const signUpSchema = signInSchema.extend({
  first_name: z.string(),
  last_name: z.string(),
});
