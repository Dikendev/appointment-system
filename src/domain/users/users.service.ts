import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Prisma, User } from '@prisma/client';
import { UserResponse } from './models/user.response';
import { PrismaService } from '../../external/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  async user(
    UserWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: UserWhereUniqueInput,
    });

    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        profilePicture: data.profilePicture,
        phoneNumber: data.phoneNumber,
        workingTimes: {
          create: data.workingTimes?.create,
        },
        bookings: {
          create: data.bookings?.create,
        },
      },
    });
    return user;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  // danger method lol
  // async deleteUsers(where: Prisma.UserWhereInput) {
  //   return this.prisma.user.deleteMany({
  //     where,
  //   });
  // }

  async findUserWithBookings(userId: number): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        bookings: true,
      },
    });

    return new UserResponse(user);
  }

  async getUserWorkingTimeByUser(
    where: Prisma.ScheduleWhereInput,
  ): Promise<any> {
    const time = this.prisma.user.findUnique({
      where: {
        id: Number(where.id),
      },
      select: {
        workingTimes: true,
      },
    });

    return time;
  }

  async getUserCache(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async addToCache(key: string, value: any) {
    return await this.cacheManager.set(key, value, 0);
  }
}
