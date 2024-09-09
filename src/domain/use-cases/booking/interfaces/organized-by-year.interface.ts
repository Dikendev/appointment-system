import { Booking } from '../../../entities/models';
import { _BOOKING_DATE_PARAM } from '../constants/booking-date-param.constant';

export type BookingDateKey = keyof typeof _BOOKING_DATE_PARAM;

export type BookingDateParam = (typeof _BOOKING_DATE_PARAM)[BookingDateKey];

export interface Year {
  year: number;
  months?: Month[];
}

export interface Month {
  month: number;
  days?: Day[];
}

export interface Day {
  day: number;
  bookings: Booking[];
}

export interface BookingDate {
  year: number;
  month: number;
  day: number;
}

export interface bundleBookingData {
  dayData: Day[];
  yearData: Year;
}
