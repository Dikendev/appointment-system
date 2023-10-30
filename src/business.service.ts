import { Business, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async business(
    businessWhereUniqueInput: Prisma.BusinessWhereUniqueInput,
  ): Promise<Business | null> {
    return this.prisma.business.findUnique({
      where: businessWhereUniqueInput,
    });
  }

  async businesses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BusinessWhereUniqueInput;
    where?: Prisma.BusinessWhereInput;
    orderBy?: Prisma.BusinessOrderByWithRelationInput;
  }): Promise<Business[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.business.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBusiness(data: Prisma.BusinessCreateInput): Promise<Business> {
    return this.prisma.business.create({
      data,
    });
  }

  async updateBusiness(params: {
    where: Prisma.BusinessWhereUniqueInput;
    data: Prisma.BusinessUpdateInput;
  }): Promise<Business> {
    const { where, data } = params;

    return this.prisma.business.update({
      where,
      data,
    });
  }

  async deleteBusiness(
    where: Prisma.BusinessWhereUniqueInput,
  ): Promise<Business> {
    return this.prisma.business.delete({
      where,
    });
  }
}
