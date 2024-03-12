import { Booking, Client as ClientPrisma } from '@prisma/client';

export class ClientResponse implements ClientResponseModel {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  bookings?: Booking[];

  constructor(client: ClientResponse) {
    this.id = client.id;
    this.name = client.name;
    this.email = client.email;
    this.phoneNumber = client.phoneNumber;
    this.profilePicture = client.profilePicture;
    this.profilePicture = client.profilePicture;
    this.bookings = client?.bookings;
  }
}

export type ClientResponseModel = Omit<
  ClientPrisma,
  'password' | 'createdAt' | 'updatedAt'
>;
