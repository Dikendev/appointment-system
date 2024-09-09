import { WorkingTime } from './working-time';
import { Booking } from './booking';
import { Profile } from './profile';

export class User {
  constructor(
    public id: string,
    public name: string,
    public profile: Profile,
    public createdAt: Date,
    public updatedAt: Date,
    public workingTimes?: WorkingTime[],
    public bookings?: Booking[],
    public password?: string,
  ) {}
}
