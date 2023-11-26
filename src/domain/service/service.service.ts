import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Service as ServiceModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ServiceResponseDTO } from './service.model';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput,
  ): Promise<ServiceModel | null> {
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
  }): Promise<ServiceModel[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.service.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createService(
    data: Prisma.ServiceCreateInput,
  ): Promise<ServiceResponseDTO> {
    const alreadyExist = await this.prisma.service.findUnique({
      where: {
        name: data.name,
      },
    });

    if (alreadyExist) {
      console.log(alreadyExist);
      throw new ForbiddenException('Already service with same name');
    }
    return this.prisma.service.create({
      data,
    });
  }

  async deleteService(serviceName: string) {
    console.log('serviceName service ', serviceName);
    const service = await this.prisma.service.delete({
      where: { name: serviceName },
    });
    return service;
  }
}
