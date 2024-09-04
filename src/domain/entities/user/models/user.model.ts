import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  profilePicture: z.string(),
  phoneNumber: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  profile: profileSchema.optional(),
  workingTimes: z.array(workingTimeSchema),
  bookings: z.array(workingModel),
});
