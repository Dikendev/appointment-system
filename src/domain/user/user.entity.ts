import { Booking } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  bookings: Booking[];
}

export class CreateUserDTO {
  name: string;
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  profilePicture: string;
  phoneNumber: string;
  workingTimes: WorkingTime[];
}

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  bookings: Booking[];
}

export class WorkingTime {
  time: string;
}
