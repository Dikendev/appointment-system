import { Injectable } from '@nestjs/common';
import { BookingDto } from '../../entities/dtos';
import { Booking } from '../../entities/models';
import { IBookingRepository } from '../../repositories/booking/booking-repository.interface';

@Injectable()
export class BookingUseCase {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async create(body: BookingDto): Promise<Booking> {
    return this.bookingRepository.create(body);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }
}
