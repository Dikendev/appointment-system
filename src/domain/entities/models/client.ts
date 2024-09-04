import { Booking } from '@prisma/client';
import { Profile } from './profile';

export class Client {
  id: number;
  name: string;
  profile: Profile;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
}
