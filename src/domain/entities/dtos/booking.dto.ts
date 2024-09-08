import { z } from 'zod';

export const bookingSchema = z.object({
  userId: z.string(),
  clientId: z.string(),
  procedureId: z.string(),
  total: z.number(),
  startAt: z.date(),
  finishAt: z.date(),
});

export type BookingDto = z.infer<typeof bookingSchema>;
