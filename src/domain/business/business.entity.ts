import { Service } from '../service/service.entity';
import { User } from '../user/user.entity';

export class Business {
  id: string;
  owner: User;
  services: Service[];
}
