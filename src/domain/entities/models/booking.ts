import { Client } from './client';
import { Procedure } from './procedure';
import { User } from './user';

export class Booking {
  id: number;
  user: User;
  client: Client;
  procedure: Procedure;
  total: number;
  startAt: Date;
  finishAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
