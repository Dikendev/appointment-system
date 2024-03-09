import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientResponse, CreateClientDTO } from './model/client.model';
import { ClientRepository } from './repository/client.repository';
import {
  Logger,
  LoggerKey,
} from '../../external/logger/domain/logger.repository';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientRepository: ClientRepository,
    @Inject(LoggerKey) private logger: Logger,
  ) {}

  @Get()
  async clients(): Promise<ClientResponse[]> {
    this.logger.info('Get all clients!', {
      props: {
        foo: 'bar',
        baz: 'qux',
      },
    });
    const clients = await this.clientRepository.clients();
    return clients;
  }

  @Get(':id')
  async clientById(@Param('id') id: number): Promise<ClientResponse> {
    return this.clientRepository.client(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createClient(@Body() data: CreateClientDTO): Promise<ClientResponse> {
    const clientResponse = await this.clientRepository.createClient(data);
    return clientResponse;
  }

  @Delete('client/:id')
  async deleteClient(@Param('id') id: number) {
    return this.clientRepository.deleteClient(id);
  }
}
