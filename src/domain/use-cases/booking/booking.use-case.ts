import { Inject, Injectable } from '@nestjs/common';
import { BookingDto } from '../../entities/dtos';
import { Booking } from '../../entities/models';
import { IBookingRepository } from '../../repositories/booking/booking-repository.interface';
import { IProcedureRepository } from '../../repositories/procedure/procedure-repository.interface';
import {
  Logger,
  LoggerKey,
} from '../../../external/logger/domain/logger.repository';
import { OrganizedByYearUseCase } from './organized-by-year.use-case';
import { BookingClientSideResponse } from './interfaces/booking-client-side.interface';
import { TotalEarnedToday } from './interfaces/total-earned-today.interface';

@Injectable()
export class BookingUseCase {
  constructor(
    @Inject(LoggerKey) private readonly logger: Logger,
    private readonly bookingRepository: IBookingRepository,
    private readonly procedureRepository: IProcedureRepository,
    private readonly organizeByYear: OrganizedByYearUseCase,
  ) {}

  async earnedToday(userId: string): Promise<TotalEarnedToday> {
    const bookingsByUser =
      await this.bookingRepository.findAllBookingsByUserId(userId);

    const bookingsToday = bookingsByUser.filter((booking) => {
      const bookingDate = new Date(booking.startAt);
      return this.isToday(bookingDate);
    });

    const earnedToday = bookingsToday.reduce(
      (acc, booking) => booking.total + acc,
      0,
    );

    this.logger.info(`Total earned today: ${earnedToday}`);

    return {
      totalEarnedToday: earnedToday,
    };
  }

  async findAllBookingsByUserId(userId: string): Promise<any[]> {
    const bookings =
      await this.bookingRepository.findAllBookingsByUserId(userId);

    const bookingClientSideResponse: BookingClientSideResponse =
      this.organizeByYear.execute(bookings);

    return bookingClientSideResponse;
  }

  async create(body: BookingDto): Promise<Booking> {
    // TODO: Implement to create a booking with more than one procedure
    const { startAt, procedureId } = body;

    const procedure = await this.procedureRepository.findById(procedureId);

    const finishAt = this.addMinutesToDate(
      new Date(startAt),
      procedure.requiredTimeMin,
    );

    return this.bookingRepository.create({
      ...body,
      finishAt,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  private addMinutesToDate(dateString: Date, minutesToAdd: number): Date {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date;
  }

  private isToday(bookingDate: Date): boolean {
    const today = new Date();
    // validar se é aqui mesmo qu tenho que subtrar 1
    const isToday = bookingDate.getDate() === today.getDate() - 1;
    const isThisMonth = bookingDate.getMonth() === today.getMonth();
    const isThisYear = bookingDate.getFullYear() === today.getFullYear();
    return isToday && isThisMonth && isThisYear;
  }
}
