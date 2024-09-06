import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { IBookingRepository } from './booking-repository.interface';
import { BookingDto } from '../../entities/dtos';
import { Booking } from '../../entities/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: BookingDto): Promise<Booking> {
    throw new Error('Method not implemented.');
    // const { startAt, userId, clientId, procedureId } = createBookingDto;
    // const serviceData = await this.procedureRepository.procedure({
    //   id: Number(procedureId),
    // });
    // const finishAt = this.addMinutesToDate(
    //   startAt,
    //   serviceData.requiredTimeMin,
    // );
    // const booking = await this.prisma.booking.create({
    //   data: {
    //     startAt: new Date(startAt),
    //     finishAt: new Date(finishAt),
    //     user: { connect: { id: userId } },
    //     client: { connect: { id: clientId } },
    //     procedure: { connect: { id: procedureId } },
    //     total: serviceData.price,
    //   },
    //   include: {
    //     user: true,
    //     client: true,
    //     procedure: true,
    //   },
    // });
    // return booking;
  }
  async findById(id: number): Promise<Booking> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Booking[]> {
    throw new Error('Method not implemented.');
  }
}

// async createBooking(
//   createBookingDto: CreateBookingDto,
// ): Promise<BookingResponse> {
//   const { startAt, userId, clientId, procedureId } = createBookingDto;

//   const serviceData = await this.procedureRepository.procedure({
//     id: Number(procedureId),
//   });

//   const finishAt = this.addMinutesToDate(
//     startAt,
//     serviceData.requiredTimeMin,
//   );

//   const booking = await this.prisma.booking.create({
//     data: {
//       startAt: new Date(startAt),
//       finishAt: new Date(finishAt),
//       user: { connect: { id: userId } },
//       client: { connect: { id: clientId } },
//       procedure: { connect: { id: procedureId } },
//       total: serviceData.price,
//     },
//     include: {
//       user: true,
//       client: true,
//       procedure: true,
//     },
//   });

//   return booking;
// }

// async findBookingsByUserId(id: string): Promise<BookingResponse[]> {
//   return await this.prisma.booking.findMany({
//     where: {
//       userId: Number(id),
//     },
//     include: {
//       user: true,
//       client: true,
//       procedure: true,
//     },
//   });
// }

// async findBookingById(id: string): Promise<BookingResponse> {
//   const booking = await this.prisma.booking.findUnique({
//     where: {
//       id: Number(id),
//     },
//     include: {
//       user: true,
//       client: true,
//       procedure: true,
//     },
//   });

//   if (!booking) {
//     throw new Error('Booking not found');
//   }

//   return booking;
// }

// async findAllBookings(): Promise<BookingResponse[]> {
//   return await this.prisma.booking.findMany();
// }

// async findBookingByDate(date: string): Promise<BookingResponse[]> {
//   return this.prisma.booking.findMany({
//     where: {
//       AND: [
//         { startAt: { gte: new Date(date) } },
//         {
//           startAt: {
//             lt: new Date(
//               new Date(date).setDate(new Date(date).getDate() + 1),
//             ),
//           },
//         },
//       ],
//     },
//     include: {
//       user: true,
//       procedure: true,
//     },
//   });
// }

// private addMinutesToDate(dateString: Date, minutesToAdd: number) {
//   const date = new Date(dateString);
//   date.setMinutes(date.getMinutes() + minutesToAdd);
//   return date.toISOString();
// }
