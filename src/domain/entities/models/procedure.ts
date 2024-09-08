import { Booking } from './booking';

export class Procedure {
  id: string;
  name: string;
  price: number;
  requiredTimeMin: number;
  procedureImage?: string;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
}
