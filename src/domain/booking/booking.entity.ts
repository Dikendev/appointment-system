import { Client, Service, User } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

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
  @IsDate()
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
