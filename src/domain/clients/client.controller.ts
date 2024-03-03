import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ClientResponse, CreateClientDTO } from './model/client.model';
import { ClientRepository } from './repository/client.repository';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientRepository: ClientRepository) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClient(@Body() data: CreateClientDTO): Promise<ClientResponse> {
    const clientResponse = await this.clientRepository.createClient(data);
    return clientResponse;
  }

  @Get()
  async getAllClients(): Promise<ClientResponse[]> {
    const clients = await this.clientRepository.clients();
    return clients;
  }

  @Get(':id')
  async getClient(@Param('id') id: number): Promise<ClientResponse> {
    return this.clientRepository.client(id);
  }
}
