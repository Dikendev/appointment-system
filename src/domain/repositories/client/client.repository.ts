import { ClientDto } from '../../entities/dtos';
import { IClientRepository } from './client-repository.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Logger } from 'winston';
import { LoggerKey } from '../../../external/logger/domain/logger.repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { Client } from '../../entities/models';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(LoggerKey) private logger: Logger,
  ) {}

  async create(body: ClientDto): Promise<Client> {
    return this.prismaService.client.create({
      data: {
        name: body.name,
        password: body.password,
        profile: { create: { email: body.profile.email } },
      },
    });
  }

  async findById(id: string): Promise<Client> {
    this.logger.info(`Fetching client with id: ${id}`);

    const client = await this.prismaService.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.prismaService.client.findMany({
      include: { bookings: true },
    });
  }

  async delete(id: string): Promise<Client> {
    try {
      return this.prismaService.client.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
