import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './client.model';
import { Client as ClientModel } from '@prisma/client';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClient(@Body() data: ClientDTO): Promise<ClientModel> {
    const { name, email, phoneNumber, profilePicture } = data;

    return this.clientService.createClient({
      name,
      email,
      phoneNumber,
      profilePicture,
    });
  }

  @Get('/:id/id')
  async getClient(@Param('id') id: string): Promise<ClientDTO> {
    console.log('sssssss');

    console.log('s', await this.clientService.client({ id: Number(id) }));
    return this.clientService.client({
      id: Number(id),
    });
  }

  @Get('/get-all')
  async getAllClients(): Promise<ClientDTO[]> {
    console.log('1asas2');
    const clients = this.clientService.clients({});

    if (!(await clients).length) {
      throw new NotFoundException('No clients found');
    }

    return clients;
  }
}
