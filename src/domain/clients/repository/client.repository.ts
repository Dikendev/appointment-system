import { CreateClientDTO } from '../models/client-model.dto';
import { ClientResponse } from '../models/client-model-response';

export abstract class ClientRepository {
  abstract client: (id: number) => Promise<ClientResponse>;
  abstract clients: () => Promise<ClientResponse[]>;
  abstract createClient: (data: CreateClientDTO) => Promise<ClientResponse>;
  abstract deleteClient: (id: number) => Promise<ClientResponse>;
}
