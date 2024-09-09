import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserDto } from '../../entities/dtos';
import { User } from '../../entities/models';
import { IUserRepository } from './user-repository.interface';
import { UserFactory } from '../../use-cases/user/user-factory.service';

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
      include: { profile: true },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const profile = await this.prismaService.profile.findUnique({
      where: { email: email },
    });

    console.log(profile);

    if (!profile) return null;

    const user = await this.prismaService.user.findUnique({
      where: { id: profile.userId },
      include: { profile: true },
    });

    return user;
  }

  async findByEmailNoCredential(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    return UserFactory.omitPassword(user);
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({ include: { profile: true } });
  }

  async deleteById(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
      include: { profile: true },
    });
  }

  async wipe() {
    await this.prismaService.user.deleteMany();
  }
}

export function exclude<T, K extends keyof T>(table: T, keys: K[]): Omit<T, K> {
  const entries = Object.entries(table).filter(
    ([key]) => !keys.includes(key as K),
  );
  return Object.fromEntries(entries) as Omit<T, K>;
}
