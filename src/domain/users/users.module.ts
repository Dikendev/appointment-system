import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../external/prisma/prisma.module';

@Module({
  providers: [UsersService, PrismaModule],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
