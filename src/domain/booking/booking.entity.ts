import { Client, Service, User } from '@prisma/client';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export interface Booking {
  id: number;
  userId: number;
  clientId: number;
  date: Date;
  user: User;
  client: Client;
  service: Service;
}

export class CreateBookingDTO {
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsInt()
  @IsNotEmpty()
  user: number;

  @IsInt()
  @IsNotEmpty()
  client: number;

  @IsInt()
  @IsNotEmpty()
  service: number;
}
