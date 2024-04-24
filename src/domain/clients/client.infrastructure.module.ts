import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PrismaModule } from '../../external/prisma/prisma.module';
import { ClientPrismaService } from './client-prisma.service';
import { ClientRepository } from './repository/client.repository';
import {
  Logger,
  LoggerKey,
} from '../../external/logger/domain/logger.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: LoggerKey, useClass: Logger },
    ClientPrismaService,
    { provide: ClientRepository, useClass: ClientPrismaService },
  ],
  controllers: [ClientController],
  exports: [ClientRepository],
})
export class ClientInfrastructureModule {}
