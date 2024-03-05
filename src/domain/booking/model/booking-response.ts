import { Booking as BookingModel } from '@prisma/client';

export class BookingResponse
  implements Omit<BookingModel, 'serviceId' | 'createdAt' | 'updatedAt'>
{
  id: number;
  total: number;
  startAt: Date;
  finishAt: Date;
  userId: number;
  clientId: number;
  serviceId: number;

  constructor(service: BookingModel) {
    this.total = service.total;
    this.startAt = service.startAt;
    this.finishAt = service.finishAt;
    this.userId = service.userId;
    this.clientId = service.clientId;
    this.serviceId = service.serviceId;
  }
}
