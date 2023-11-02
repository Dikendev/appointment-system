import { Booking } from '@prisma/client';

export class Service {
  id: string;
  name: string;
  bookings: Booking[];
}
