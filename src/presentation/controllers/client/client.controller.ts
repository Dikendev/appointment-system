import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ClientUseCase } from '../../../domain/use-cases/client/client.use-case';
import { Client } from '../../../domain/entities/models';
import { ClientDto } from '../../../domain/entities/dtos';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientUseCase: ClientUseCase) {}

  @Get(':id')
  async clientById(@Param('id') id: string): Promise<Client> {
    return this.clientUseCase.findById(Number(id));
  }

  @Get()
  async clients(): Promise<Client[]> {
    return this.clientUseCase.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: ClientDto): Promise<Client> {
    const clientResponse = await this.clientUseCase.create(data);
    return clientResponse;
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: number): Promise<Client> {
    return this.clientUseCase.delete(id);
  }
}
