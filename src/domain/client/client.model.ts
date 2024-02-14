import { Booking } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  bookings?: Booking[];
}

export interface ClientResponseDTO extends ClientDTO {}
