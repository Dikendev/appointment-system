import { Type } from 'class-transformer';
import {
  IsDate,
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
  workingTimes: WorkingTime[];
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
  WorkingTimes?: WorkingTime[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Booking)
  Bookings?: Booking[];
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

export class Booking {
  @IsNumber()
  clientId: number;

  @IsNumber()
  serviceId: number;

  @IsNumber()
  total: number;

  @IsDate()
  startAt: Date;

  @IsDate()
  finishAt: Date;
}
