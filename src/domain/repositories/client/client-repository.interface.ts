import { ClientDto } from '../../entities/dtos';
import { Client } from '../../entities/models';

export abstract class IClientRepository {
  abstract create(body: ClientDto): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract findAll(): Promise<Client[]>;
  abstract delete(id: string): Promise<Client>;
}
