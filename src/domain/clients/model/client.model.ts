import { Booking } from '@prisma/client';
import { Client as CLientPrisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateClientDTO implements ClientCreateModel {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}

export class ClientResponse implements ClientResponseModel {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  bookings?: Booking[];

  constructor(client: ClientResponse) {
    this.id = client.id;
    this.name = client.name;
    this.email = client.email;
    this.phoneNumber = client.phoneNumber;
    this.profilePicture = client.profilePicture;
    this.profilePicture = client.profilePicture;
    this.bookings = client?.bookings;
  }
}

export type ClientResponseModel = Omit<
  CLientPrisma,
  'password' | 'createdAt' | 'updatedAt'
>;

export type ClientCreateModel = Prisma.ClientCreateInput;
