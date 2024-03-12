import { Module } from '@nestjs/common';
import { PrismaModule } from '../../external/prisma/prisma.module';
import { ProcedureController } from './procedure.controller';

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [ProcedureController],
  exports: [],
})
export class ProcedureModule {}
