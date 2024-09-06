import { WorkingTime } from './working-time';
import { Booking } from './booking';
import { Profile } from './profile';

export class User {
  id: number;
  name: string;
  profile?: Profile;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  workingTimes?: WorkingTime[];
  bookings?: Booking[];
}
