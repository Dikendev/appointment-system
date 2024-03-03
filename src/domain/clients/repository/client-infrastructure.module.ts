import { Module } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { ClientPrismaService } from './client-prisma.service';
import { PrismaModule } from '../../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    ClientPrismaService,
    { provide: ClientRepository, useExisting: ClientPrismaService },
  ],
  exports: [ClientRepository],
})
export class ClientInfrastructureModule {}
