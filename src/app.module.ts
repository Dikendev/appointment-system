import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ProcedureService } from './domain/procedures/procedure.service';
import { BookingService } from './domain/booking/booking.service';
import { ServiceController } from './domain/procedures/procedure.controller';
import { BookingController } from './domain/booking/booking.controller';
import { UsersModule } from './domain/users/users.module';
import { ClientModule } from './domain/clients/client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      max: 10,
      ttl: 600,
    }),
    ClientModule,
    ConfigModule,
  ],
  controllers: [AppController, ServiceController, BookingController],
  providers: [AppService, ProcedureService, BookingService],
})
export class AppModule {}
