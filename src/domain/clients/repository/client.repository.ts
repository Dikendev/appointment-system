import { ClientResponse, CreateClientDTO } from '../model/client.model';

export abstract class ClientRepository {
  abstract client: (id: number) => Promise<ClientResponse>;
  abstract clients: () => Promise<ClientResponse[]>;
  abstract createClient: (data: CreateClientDTO) => Promise<ClientResponse>;
}
