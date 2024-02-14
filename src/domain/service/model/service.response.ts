import { Booking } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ServiceResponseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  requiredTimeMin: number;

  serviceImage?: string;
  bookings?: Booking[];

  constructor(service: any) {
    this.name = service.name;
    this.price = service.price;
    this.requiredTimeMin = service.requiredTimeMin;
    this.serviceImage = service.serviceImage;
  }
}
