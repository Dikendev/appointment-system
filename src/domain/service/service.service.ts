import { Injectable } from '@nestjs/common';
import { Prisma, Service } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput,
  ): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: serviceWhereUniqueInput,
    });
  }

  async services(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ServiceWhereUniqueInput;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput;
  }): Promise<Service[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.service.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    return this.prisma.service.create({
      data,
    });
  }
}
