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
  procedureId: number;

  constructor(booking: BookingModel) {
    this.total = booking.total;
    this.startAt = booking.startAt;
    this.finishAt = booking.finishAt;
    this.userId = booking.userId;
    this.clientId = booking.clientId;
    this.procedureId = booking.procedureId;
  }
}
