import { Client, Service, User } from '@prisma/client';

export interface Booking {
  id: number;
  userId: number;
  clientId: number;
  date: Date;
  user: User;
  client: Client;
  service: Service;
}
