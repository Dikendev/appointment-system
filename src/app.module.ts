import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { BookingService } from './domain/booking/booking.service';
import { BookingController } from './domain/booking/booking.controller';
import { UsersModule } from './domain/users/users.module';
import { ClientInfrastructureModule } from './domain/clients/client.infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { ProcedureModule } from './domain/procedures/procedure.module';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      max: 10,
      ttl: 600,
    }),
    ClientInfrastructureModule,
    UsersModule,
    ProcedureModule,
  ],
  controllers: [AppController, BookingController],
  providers: [AppService, BookingService],
})
export class AppModule {}
