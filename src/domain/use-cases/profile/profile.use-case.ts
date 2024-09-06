import { Injectable } from '@nestjs/common';
import { Profile } from '../../entities/models';
import { IProfileRepository } from '../../repositories/profile/profile-repository.interface';

@Injectable()
export class ProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async findOne(userId: number): Promise<Profile> {
    return this.profileRepository.findOne(userId);
  }

  async create(): Promise<Profile> {
    return this.profileRepository.create();
  }
}
