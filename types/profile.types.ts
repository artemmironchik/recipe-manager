import { z } from 'zod';

import { profileSchema } from '@/schemas';

export type Profile = z.infer<typeof profileSchema>;
