import { BookingModel } from '../../booking/model';

export class UserResponse {
  id: number;
  name: string;
  email: string;
  password?: string;
  profilePicture?: string;
  phoneNumber?: string;
  workingTimes?: WorkingTime[];
  bookings?: BookingModel[];
}
