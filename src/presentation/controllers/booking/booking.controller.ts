import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingDto } from '../../../domain/entities/dtos';
import { Booking, User } from '../../../domain/entities/models';
import { JwtAuthGuard } from '../../../domain/auth/jwt-strategy/jwt-auth.guard';
import { UserLogged } from '../../user.decorator';
import { BookingUseCase } from '../../../domain/use-cases/booking/booking.use-case';
import { TotalEarnedToday } from '../../../domain/use-cases/booking/interfaces/total-earned-today.interface';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: BookingDto): Promise<Booking> {
    return this.bookingUseCase.create(body);
  }

  // @Get('id/:id')
  // async getBookingUsers(@Param('id') id: string): Promise<BookingResponse[]> {
  //   const bookings = await this.bookingUseCase.findBookingsByUserId(id);
  //   return bookings;
  // }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllByUserId(@UserLogged() user: User): Promise<Booking[]> {
    console.log('user decorator', user);
    return this.bookingUseCase.findAllBookingsByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return await this.bookingUseCase.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('earned-today/:id')
  async earnedTodayByUser(@Param('id') id: string): Promise<TotalEarnedToday> {
    return await this.bookingUseCase.earnedToday(id);
  }

  // @Get('by-day')
  // async getBookingByDay(
  //   @Query('date') date: string,
  // ): Promise<BookingResponse[]> {
  //   const bookings = await this.bookingRepository.findBookingByDate(date);
  //   return bookings;
  // }
}
