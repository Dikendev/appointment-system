import { BookingDto } from '../../entities/dtos';
import { Booking } from '../../entities/models';

export abstract class IBookingRepository {
  abstract create(body: BookingDto): Promise<Booking>;
  abstract findById(id: number): Promise<Booking>;
  abstract findAll(): Promise<Booking[]>;
  abstract findAllBookingsByUserId(userId: string): Promise<Booking[]>;
}
