import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserResponseDTO } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaClient,
  ) {}

  async getUserCACHE(key: string): Promise<any> {
    console.log('user getUserCACHE', key);

    return await this.cacheManager.get(key);
  }
  async addToCACHE(key: string, value: any) {
    return await this.cacheManager.set(key, value, 0);
  }

  async user(
    UserWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: UserWhereUniqueInput,
    });
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
    return this.prisma.user.create({
      data,
    });
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

  async deleteUsers(where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({
      where,
    });
  }

  async findUserWithBookings(userId: number): Promise<UserResponseDTO> {
    const user = this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        bookings: true,
      },
    });

    return {
      id: (await user).id,
      name: (await user).name,
      email: (await user).email,
      bookings: (await user).bookings,
    };
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
}
