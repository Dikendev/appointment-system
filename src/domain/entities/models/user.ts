import { WorkingTime } from './working-time';
import { Booking } from './booking';
import { Profile } from './profile';

export class User {
  id: string;
  name: string;
  profile: Profile;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  workingTimes?: WorkingTime[];
  bookings?: Booking[];

  constructor(user: Partial<User>) {
    this.id = user.id;
    this.name = user.name;
    this.profile = user.profile;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.workingTimes = user?.workingTimes;
    this.bookings = user?.bookings;
  }
}

export class UserFactory {
  static userResponse(data: User): User {
    return new User({
      id: data.id,
      name: data.name,
      profile: data.profile,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      workingTimes: data.workingTimes,
      bookings: data.bookings,
    });
  }
}
