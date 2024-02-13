import { Booking } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  bookings: Booking[];
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WorkingTime)
  workingTime: WorkingTime[];
}

export class WorkingTime {
  @IsOptional()
  @IsDateString()
  from: Date;

  @IsOptional()
  @IsDateString()
  to: Date;

  @IsOptional()
  @IsNumber()
  userId: number;
}

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  bookings?: Booking[];
}
