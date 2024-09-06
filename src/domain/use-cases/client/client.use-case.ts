import { Injectable } from '@nestjs/common';
import { ClientDto } from '../../entities/dtos';
import { Client } from '../../entities/models';
import { IClientRepository } from '../../repositories/client/client-repository.interface';

@Injectable()
export class ClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async create(body: ClientDto): Promise<Client> {
    return this.clientRepository.create(body);
  }

  async findById(id: number): Promise<Client> {
    return this.clientRepository.findById(id);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async delete(id: number): Promise<Client> {
    return this.clientRepository.delete(id);
  }
}
