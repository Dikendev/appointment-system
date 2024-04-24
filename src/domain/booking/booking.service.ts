import { Injectable } from '@nestjs/common';
import { Booking as BookingModel, Prisma } from '@prisma/client';
import { PrismaService } from '../../external/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(data: Prisma.BookingCreateInput): Promise<BookingModel> {
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
        procedure: true,
      },
    });
  }

  async getAllBookings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProcedureWhereUniqueInput;
    where?: Prisma.ProcedureWhereInput;
    orderBy?: Prisma.ProcedureOrderByWithRelationInput;
  }): Promise<BookingModel[]> {
    const { skip, take, orderBy } = params;

    return await this.prisma.booking.findMany({
      skip,
      take,
      orderBy,
      include: {
        client: true,
        procedure: true,
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
        procedure: true,
      },
    });
  }
}
