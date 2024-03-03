import { Module } from '@nestjs/common';
import { ClientInfrastructureModule } from './repository/client-infrastructure.module';
import { ClientController } from './client.controller';

@Module({
  imports: [ClientInfrastructureModule],
  controllers: [ClientController],
})
export class ClientModule {}
