import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ServiceService } from './domain/services/service.service';
import { BookingService } from './domain/booking/booking.service';
import { ServiceController } from './domain/services/service.controller';
import { BookingController } from './domain/booking/booking.controller';
import { UsersModule } from './domain/users/users.module';
import { ClientModule } from './domain/clients/client.module';

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
  ],
  controllers: [AppController, ServiceController, BookingController],
  providers: [AppService, ServiceService, BookingService],
})
export class AppModule {}
