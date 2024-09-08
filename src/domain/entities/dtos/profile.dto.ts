import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string().email(),
  profilePicture: z.string().optional(),
  phoneNumber: z.string().optional(),
  userId: z.number().optional(),
  clientId: z.number().optional(),
});

export type ProfileDto = z.infer<typeof profileSchema>;

export const profileUpdateSchema = profileSchema.omit({
  userId: true,
  clientId: true,
});

export type ProfileUpdateDto = z.infer<typeof profileUpdateSchema>;
