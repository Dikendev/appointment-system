import { Module } from '@nestjs/common';
import { ProcedureController } from '../../presentation/controllers/procedure/procedure.controller';
import { ProcedureUseCase } from '../use-cases/procedure/procedure.use-case';
import { IProcedureRepository } from '../repositories/procedure/procedure-repository.interface';
import { ProcedureRepository } from '../repositories/procedure/procedure.repository';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    ProcedureUseCase,
    { provide: IProcedureRepository, useClass: ProcedureRepository },
  ],
  controllers: [ProcedureController],
  exports: [IProcedureRepository],
})
export class ProcedureModule {}
