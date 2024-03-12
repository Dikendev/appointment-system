/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotImplementedException } from '@nestjs/common';
import { ClientResponse, CreateClientDTO } from '../models';
import { ClientRepository } from '../repository/client.repository';

describe('ClientRepository', () => {
  let clientRepository: ClientRepository;

  beforeEach(() => {
    clientRepository = new MockClientRepository();
  });

  it('should have client method', () => {
    expect(clientRepository.client).toBeTruthy();
    expect(typeof clientRepository.client).toBe('function');
  });

  it('should have a clients method', () => {
    expect(clientRepository.clients).toBeTruthy();
    expect(typeof clientRepository.clients).toBe('function');
  });

  it('should have a createClient method ', () => {
    expect(clientRepository.createClient).toBeTruthy();
    expect(typeof clientRepository.createClient).toBe('function');
  });

  it('should have a deleteClient method', () => {
    expect(clientRepository.deleteClient).toBeTruthy();
    expect(typeof clientRepository.deleteClient).toBe('function');
  });
});

class MockClientRepository implements ClientRepository {
  async client(id: number): Promise<ClientResponse> {
    throw new NotImplementedException();
  }

  async clients(): Promise<ClientResponse[]> {
    throw new NotImplementedException();
  }

  async createClient(data: CreateClientDTO): Promise<ClientResponse> {
    throw new NotImplementedException();
  }

  async deleteClient(id: number): Promise<ClientResponse> {
    throw new NotImplementedException();
  }
}
