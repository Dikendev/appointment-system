import { z } from 'zod';
import { profileSchema } from './profile.dto';

export const clientSchema = z.object({
  name: z.string(),
  profile: profileSchema,
  password: z.string(),
});

export type ClientDto = z.infer<typeof clientSchema>;
