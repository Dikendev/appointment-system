import { z } from 'zod';

export const bookingSchema = z.object({
  userId: z.number(),
  clientId: z.number(),
  procedureId: z.number(),
  total: z.number(),
  startAt: z.date(),
  finishAt: z.date(),
});

export type BookingDto = z.infer<typeof bookingSchema>;
