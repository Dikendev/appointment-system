import { z } from 'zod';
import { profileSchema } from './profile.dto';
import { workingTimeSchema } from './working-time.dto';

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string({ message: 'Password is required' }),
  confirmPassword: z.string({ message: 'Confirm password is required' }),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const userSchema = z.object({
  name: z.string(),
  profile: profileSchema.optional(),
  password: z.string(),
  workingTimes: z.array(workingTimeSchema).optional(),
});

export type UserDto = z.infer<typeof userSchema>;
