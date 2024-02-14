import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ServiceService } from './domain/service/service.service';
import { ClientService } from './domain/client/client.service';
import { BookingService } from './domain/booking/booking.service';
import { ServiceController } from './domain/service/service.controller';
import { ClientController } from './domain/client/client.controller';
import { BookingController } from './domain/booking/booking.controller';

@Module({
  imports: [
    UserModule,
    CacheModule.register({
      isGlobal: true,
      store: 'memory',
      max: 10,
      ttl: 600,
    }),
  ],
  controllers: [
    AppController,
    ServiceController,
    ClientController,
    BookingController,
  ],
  providers: [
    AppService,
    PrismaService,
    ServiceService,
    ClientService,
    BookingService,
    { provide: PrismaClient, useValue: new PrismaClient() },
  ],
})
export class AppModule {}
