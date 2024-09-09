import { Injectable } from '@nestjs/common';
import { Profile } from '../../entities/models';
import { IProfileRepository } from '../../repositories/profile/profile-repository.interface';
import { Request } from 'express';
import { ProfileUpdateDto } from '../../entities/dtos';

@Injectable()
export class ProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async me(request: Request): Promise<Profile> {
    const payload = request.user;
    return this.profileRepository.me(payload.profile.email);
  }

  async updateUser(request: Request, body: ProfileUpdateDto): Promise<Profile> {
    const payload = request.user;
    return this.profileRepository.updateUser(payload.id, body);
  }

  async updateClient(id: string, body: ProfileUpdateDto): Promise<Profile> {
    return this.profileRepository.updateClient(id, body);
  }
}
