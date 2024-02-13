import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBookingDTO, ResponseBookingDTO } from './booking.entity';
import { Booking as BookingModel, PrismaClient } from '@prisma/client';
import { ServiceService } from '../service/service.service';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly bookingService: BookingService,
    private readonly prisma: PrismaClient,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(@Body() data: CreateBookingDTO): Promise<BookingModel> {
    console.log('data', data);

    const { startAt, userId, clientId, serviceId } = data;

    console.log('serviceId', serviceId);

    const serviceData = await this.serviceService.service({
      id: Number(serviceId),
    });

    const finishAt = this.addMinutesToDate(
      startAt,
      serviceData.requiredTimeMin,
    );

    return this.bookingService.createBooking({
      startAt: new Date(startAt),
      finishAt: new Date(finishAt),
      user: { connect: { id: userId } },
      client: { connect: { id: clientId } },
      service: { connect: { id: serviceId } },
      total: serviceData.price,
    });
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.FOUND)
  async getBookingUsers(
    @Param('id') id: string,
  ): Promise<ResponseBookingDTO[]> {
    const bookings = await this.bookingService.getBookingByUser(id);
    // return bookings;
    return bookings.map((booking) => new ResponseBookingDTO(booking));
  }

  @Get('')
  @HttpCode(HttpStatus.ACCEPTED)
  async getAllBookingUsers(): Promise<any> {
    return await this.bookingService.getAllBookings({});
  }

  private addMinutesToDate(dateString: string, minutesToAdd: any) {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + minutesToAdd);

    return date.toISOString();
  }

  @Get('/by-day')
  @HttpCode(HttpStatus.FOUND)
  async getBookingByDay(
    @Query('date') date: string,
  ): Promise<ResponseBookingDTO[]> {
    console.log(date);
    const bookings = await this.bookingService.getBookingByDay(date);
    return bookings.map((booking) => new ResponseBookingDTO(booking));
  }
}
