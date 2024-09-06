import { Module } from '@nestjs/common';
import { IProfileRepository } from '../repositories/profile/profile-repository.interface';
import { ProfileRepository } from '../repositories/profile/profile.repository';
import { ProfileUseCase } from '../use-cases/profile/profile.use-case';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileUseCase,
    { provide: IProfileRepository, useClass: ProfileRepository },
  ],
  controllers: [],
  exports: [IProfileRepository],
})
export class ProfileModule {}
