import { Module } from '@nestjs/common';
import { IUserRepository } from './user/user-repository.interface';
import { UserRepository } from './user/user.repository';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IUserRepository, useClass: UserRepository }],
  exports: [IUserRepository],
})
export class RepositoryModule {}
