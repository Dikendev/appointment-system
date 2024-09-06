import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingUseCase } from '../../../domain/use-cases/booking/booking.use-case';
import { BookingDto } from '../../../domain/entities/dtos';
import { Booking } from '../../../domain/entities/models';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCase) {}

  @Post()
  async create(@Body() body: BookingDto): Promise<Booking> {
    return this.bookingUseCase.create(body);
  }

  // @Get('id/:id')
  // async getBookingUsers(@Param('id') id: string): Promise<BookingResponse[]> {
  //   const bookings = await this.bookingUseCase.findBookingsByUserId(id);
  //   return bookings;
  // }

  @Get()
  async findAll(): Promise<any> {
    return await this.bookingUseCase.findAll();
  }

  // @Get('by-day')
  // async getBookingByDay(
  //   @Query('date') date: string,
  // ): Promise<BookingResponse[]> {
  //   const bookings = await this.bookingRepository.findBookingByDate(date);
  //   return bookings;
  // }
}
