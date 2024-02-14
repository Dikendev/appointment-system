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
import { ClientDTO, ClientResponseDTO } from './client.model';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClient(@Body() data: ClientDTO): Promise<ClientResponseDTO> {
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
    return this.clientService.client({
      id: Number(id),
    });
  }

  @Get('get-all')
  async getAllClients(): Promise<ClientDTO[]> {
    const clients = await this.clientService.clients({});

    if (!clients.length) {
      throw new NotFoundException('No clients found');
    }

    return clients;
  }
}
