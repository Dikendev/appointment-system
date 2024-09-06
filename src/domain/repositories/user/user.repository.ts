import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserDto } from '../../entities/dtos';
import { User } from '../../entities/models';
import { IUserRepository } from './user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: body.name,
        profile: {
          create: { email: body.profile.email },
        },
        password: body.password,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const profile = await this.prismaService.profile.findUnique({
      where: { email: email },
    });

    return this.prismaService.user.findUnique({
      where: { id: profile.userId },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async deleteById(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }

  async wipe() {
    await this.prismaService.user.deleteMany();
  }
}
