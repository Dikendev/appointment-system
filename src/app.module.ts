import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaClient } from '@prisma/client';
import { UserService } from './domain/user/user.service';
import { PrismaService } from './prisma.service';
import { ServiceService } from './domain/service/service.service';

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
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    ServiceService,
    { provide: PrismaClient, useValue: new PrismaClient() },
  ],
})
export class AppModule {}
