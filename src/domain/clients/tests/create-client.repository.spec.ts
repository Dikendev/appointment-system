/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientResponse, CreateClientDTO } from '../model/client.model';
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
});

class MockClientRepository implements ClientRepository {
  async client(id: number): Promise<ClientResponse> {
    return;
  }

  async clients(): Promise<ClientResponse[]> {
    return;
  }

  async createClient(data: CreateClientDTO): Promise<ClientResponse> {
    return;
  }
}
