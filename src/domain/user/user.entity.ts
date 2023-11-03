import { Booking } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
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
}

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  bookings: Booking[];
}
