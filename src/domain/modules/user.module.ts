import { Module } from '@nestjs/common';
import { UserController } from '../../presentation/controllers/user/user.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { UserUseCase } from '../use-cases/user/user.use-case';
import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repositories/repository.module';

@Module({
  imports: [AuthModule, PrismaModule, RepositoryModule],
  providers: [UserUseCase],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
