import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './external/logger/infrastructure/logger.module';
import { ContextModule } from './context/infrastructure/context.module';
import { ConfigModule } from './config/infrastructure/nestjs/config.module';
import {
  BookingModule,
  ClientModule,
  ProcedureModule,
  ProfileModule,
  UserModule,
  WorkingTimeModule,
} from './domain/modules';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AuthModule } from './domain/auth/auth.module';
import { RepositoryModule } from './domain/repositories/repository.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    LoggerModule,
    ContextModule,
    ConfigModule,
    UserModule,
    ProcedureModule,
    ProfileModule,
    BookingModule,
    WorkingTimeModule,
    ClientModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
