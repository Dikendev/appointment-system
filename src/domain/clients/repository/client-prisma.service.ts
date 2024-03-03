import { Prisma } from '@prisma/client';
import { ClientRepository } from './client.repository';
import { ClientResponse, CreateClientDTO } from '../model/client.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ClientPrismaService implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async client(id: number): Promise<ClientResponse> {
    const clientWhereUniqueInput =
      id as unknown as Prisma.ClientWhereUniqueInput;

    const clientsResponse = await this.prisma.client.findUnique({
      where: { id: Number(clientWhereUniqueInput) },
    });

    if (!clientsResponse) {
      throw new NotFoundException();
    }

    return new ClientResponse(clientsResponse);
  }

  async clients(): Promise<ClientResponse[]> {
    const clientsResponse = await this.prisma.client.findMany();

    if (!clientsResponse.length) {
      throw new NotFoundException();
    }

    return clientsResponse.map((client) => new ClientResponse(client));
  }

  async createClient(data: CreateClientDTO): Promise<ClientResponse> {
    const createPrismaInput: Prisma.ClientCreateInput =
      data as unknown as Prisma.ClientCreateInput;
    const client = await this.prisma.client.create({ data: createPrismaInput });
    return new ClientResponse(client);
  }
}
