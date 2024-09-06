import { Module } from '@nestjs/common';
import { LoggerModule } from '../../external/logger/infrastructure/logger.module';
import { ClientController } from '../../presentation/controllers/client/client.controller';
import { IClientRepository } from '../repositories/client/client-repository.interface';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { ClientRepository } from '../repositories/client/client.repository';
import { ClientUseCase } from '../use-cases/client/client.use-case';

@Module({
  imports: [PrismaModule, LoggerModule],
  providers: [
    ClientUseCase,
    { provide: IClientRepository, useClass: ClientRepository },
  ],
  controllers: [ClientController],
  exports: [IClientRepository],
})
export class ClientModule {}
