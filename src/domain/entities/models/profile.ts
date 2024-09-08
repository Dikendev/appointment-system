import { Client } from './client';
import { User } from './user';

export class Profile {
  id: string;
  email: string;
  profilePicture?: string;
  phoneNumber?: string;
  user?: User;
  client?: Client;
}
