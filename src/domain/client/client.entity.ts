import { Booking } from '@prisma/client';

export class Client {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}
