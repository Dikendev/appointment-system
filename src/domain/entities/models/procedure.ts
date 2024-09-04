import { Booking } from './booking';

export class Procedure {
  id: number;
  name: string;
  price: number;
  requiredTimeMin: number;
  procedureImage?: string;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
}
