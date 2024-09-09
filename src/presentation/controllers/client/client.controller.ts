import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientUseCase } from '../../../domain/use-cases/client/client.use-case';
import { Client } from '../../../domain/entities/models';
import { ClientDto } from '../../../domain/entities/dtos';
import { JwtAuthGuard } from '../../../domain/auth/jwt-strategy/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientUseCase: ClientUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async clientById(@Param('id') id: string): Promise<Client> {
    return this.clientUseCase.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async clients(): Promise<Client[]> {
    return this.clientUseCase.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: ClientDto): Promise<Client> {
    const clientResponse = await this.clientUseCase.create(data);
    return clientResponse;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientUseCase.delete(id);
  }
}
