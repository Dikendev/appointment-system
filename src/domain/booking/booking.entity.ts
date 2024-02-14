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
  startAt: Date;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;
}

export class ResponseBookingDTO {
  @IsDateString()
  @IsNotEmpty()
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  finishAt: Date;

  @IsInt()
  total: number;

  user: User;
  client: Client;
  service: Service;

  constructor(service: any) {
    this.startAt = service.startAt;
    this.finishAt = service.finishAt;
    this.total = service.total;
    this.user = service.user;
    this.client = service.client;
    this.service = service.service;
  }
}
