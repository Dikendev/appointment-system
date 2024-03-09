import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { PrismaModule } from '../../external/prisma/prisma.module';
import { ClientPrismaService } from './client-prisma.service';
import { ClientRepository } from './repository/client.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    ClientPrismaService,
    { provide: ClientRepository, useExisting: ClientPrismaService },
  ],
  controllers: [ClientController],
  exports: [ClientRepository],
})
export class ClientModule {}
