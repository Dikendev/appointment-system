import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { IBookingRepository } from '../repositories/booking/booking-repository.interface';
import { BookingRepository } from '../repositories/booking/booking.repository';
import { BookingController } from '../../presentation/controllers/booking/booking.controller';
import { BookingUseCase } from '../use-cases/booking/booking.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    BookingUseCase,
    { provide: IBookingRepository, useClass: BookingRepository },
  ],
  controllers: [BookingController],
  exports: [IBookingRepository],
})
export class BookingModule {}
