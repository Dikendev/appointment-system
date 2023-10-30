import { Business } from '../business/business.entity';

export class User {
  id: string;
  name: string;
  businesses: Business[];
}
