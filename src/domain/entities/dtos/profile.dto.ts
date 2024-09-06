import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string().email(),
  profilePicture: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export type ProfileCreateDto = z.infer<typeof profileSchema>;
