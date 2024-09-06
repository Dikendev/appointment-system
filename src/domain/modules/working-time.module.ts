import { Module } from '@nestjs/common';
import { WorkingTimeUseCase } from '../use-cases/working-time/working-time.use-case';
import { IWorkingTimeRepository } from '../repositories/working-time/working-time-repository.interface';
import { WorkingTimeRepository } from '../repositories/working-time/working-time.repository';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    WorkingTimeUseCase,
    { provide: IWorkingTimeRepository, useClass: WorkingTimeRepository },
  ],
  exports: [IWorkingTimeRepository],
})
export class WorkingTimeModule {}
