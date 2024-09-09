import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Profile } from '../../entities/models';
import { IProfileRepository } from './profile-repository.interface';
import { ProfileUpdateDto } from '../../entities/dtos';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async me(email: string): Promise<Profile> {
    return this.prismaService.profile.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateUser(id: string, body: ProfileUpdateDto): Promise<Profile> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    return this.prismaService.profile.update({
      where: {
        id: String(user.profile.id),
      },
      data: { ...body },
    });
  }

  async updateClient(id: string, body: ProfileUpdateDto): Promise<Profile> {
    return this.prismaService.profile.update({
      where: {
        clientId: id,
      },
      data: {
        ...body,
      },
    });
  }
}
