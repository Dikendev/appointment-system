import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [
    UserService,
    { provide: PrismaClient, useValue: new PrismaClient() },
  ],
  controllers: [UserController],
})
export class UserModule {}
