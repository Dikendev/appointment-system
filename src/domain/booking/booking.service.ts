import { Injectable } from '@nestjs/common';
import { Booking as BookingModel, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaClient) {}

  async createBooking(data: Prisma.BookingCreateInput): Promise<BookingModel> {
    console.log('data', data);
    return await this.prisma.booking.create({
      data,
    });
  }

  async getBookingByUser(id: string): Promise<BookingModel[]> {
    return await this.prisma.booking.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        user: true,
        client: true,
        service: true,
      },
    });
  }

  async getAllBookings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ServiceWhereUniqueInput;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput;
  }): Promise<BookingModel[]> {
    const { skip, take, orderBy } = params;

    return await this.prisma.booking.findMany({
      skip,
      take,
      orderBy,
      include: {
        client: true,
        service: true,
      },
    });
  }

  async getBookingByDay(date: string): Promise<any[]> {
    return this.prisma.booking.findMany({
      where: {
        AND: [
          { startAt: { gte: new Date(date) } },
          {
            startAt: {
              lt: new Date(
                new Date(date).setDate(new Date(date).getDate() + 1),
              ),
            },
          },
        ],
      },
      include: {
        user: true,
        service: true,
      },
    });
  }
}
