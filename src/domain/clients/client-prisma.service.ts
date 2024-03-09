import { Prisma } from '@prisma/client';
import { ClientRepository } from './repository/client.repository';
import { ClientResponse, CreateClientDTO } from './model/client.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../external/prisma/prisma.service';

@Injectable()
export class ClientPrismaService implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async client(id: number): Promise<ClientResponse> {
    const clientsResponse = await this.prisma.client.findUnique({
      where: { id },
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

  async deleteClient(id: number): Promise<ClientResponse> {
    try {
      return await this.prisma.client.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
