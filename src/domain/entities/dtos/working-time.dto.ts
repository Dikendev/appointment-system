import { z } from 'zod';

export const workingTimeSchema = z.object({
  dayTime: z.date(),
  start: z.date(),
  end: z.date(),
  userId: z.number(),
});

export type WorkingTimeDto = z.infer<typeof workingTimeSchema>;
