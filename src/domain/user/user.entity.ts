import { Booking } from '@prisma/client';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  bookings: Booking[];
}
