import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Profile } from '../../entities/models';
import { IProfileRepository } from './profile-repository.interface';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(userId: number): Promise<Profile> {
    return this.prismaService.profile.findUnique({ where: { userId: userId } });
  }

  async create(): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}
