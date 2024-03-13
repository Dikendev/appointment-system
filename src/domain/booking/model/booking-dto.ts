import { Booking as BookingModel } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingDTO
  implements Omit<BookingModel, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsDateString()
  @IsNotEmpty()
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  finishAt: Date;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @IsNumber()
  @IsNotEmpty()
  procedureId: number;
}
