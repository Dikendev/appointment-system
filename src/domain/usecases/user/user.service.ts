import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserResponse } from './models/user.response';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { UserParamDto } from './dto/user-dto';

export type Param = { id: number } | { email: string };

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(params: UserParamDto): Promise<UserResponse> {
    const param: Param = params.id
      ? { id: params.id }
      : { email: params.email };

    return this.prisma.user.findUnique({
      where: { ...param },
    });
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
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

  async wipe() {
    return this.prisma.user.deleteMany();
  }

  async findUserWithBookings(userId: number): Promise<UserResponse> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        bookings: true,
      },
    });
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
