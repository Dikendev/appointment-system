import { Booking, CreateUserDTO, WorkingTime } from './user.model';

export class UserResponseDto {
  name: string;
  email: string;
  profilePicture?: string;
  phoneNumber?: string;
  workingTimes?: WorkingTime[];
  bookings?: Booking[];

  constructor(user: CreateUserDTO) {
    this.name = user.name;
    this.email = user.email;
    this.profilePicture = user?.profilePicture;
    this.phoneNumber = user?.phoneNumber;
    this.workingTimes = user?.WorkingTimes;
    this.bookings = user?.Bookings;
  }
}
