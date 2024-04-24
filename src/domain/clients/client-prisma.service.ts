import { ClientRepository } from './repository/client.repository';
import { CreateClientDTO } from './models/client-model.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../external/prisma/prisma.service';
import { ClientResponse } from './models';

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
    const client = await this.prisma.client.create({ data });
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
