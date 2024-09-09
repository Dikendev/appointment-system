import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { IBookingRepository } from '../repositories/booking/booking-repository.interface';
import { BookingRepository } from '../repositories/booking/booking.repository';
import { BookingController } from '../../presentation/controllers/booking/booking.controller';
import { BookingUseCase } from '../use-cases/booking/booking.use-case';
import { ProcedureModule } from './procedure.module';
import { OrganizedByYearUseCase } from '../use-cases/booking/organized-by-year.use-case';

@Module({
  imports: [PrismaModule, ProcedureModule],
  providers: [
    BookingUseCase,
    OrganizedByYearUseCase,
    { provide: IBookingRepository, useClass: BookingRepository },
  ],
  controllers: [BookingController],
  exports: [IBookingRepository],
})
export class BookingModule {}
