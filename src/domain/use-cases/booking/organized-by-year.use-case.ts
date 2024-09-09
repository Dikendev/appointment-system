import { Injectable } from '@nestjs/common';
import { Booking } from '../../entities/models';
import {
  BookingDate,
  BookingDateKey,
  bundleBookingData,
  Day,
  Month,
  Year,
} from './interfaces/organized-by-year.interface';
import { BookingClientSideResponse } from './interfaces/booking-client-side.interface';
import { _BOOKING_DATE_PARAM } from './constants/booking-date-param.constant';

@Injectable()
export class OrganizedByYearUseCase {
  execute(bookings: Booking[]): BookingClientSideResponse {
    const bookingClientSideResponse: BookingClientSideResponse = [];

    bookings.forEach((booking) => {
      const extractDate = this.extractDate(booking);
      const bundleBookingData = this.bundleBookingData(extractDate, booking);

      this.fillBookingData(
        extractDate,
        bundleBookingData,
        booking,
        bookingClientSideResponse,
      );
    });

    return bookingClientSideResponse;
  }

  extractDate(booking: Booking): BookingDate {
    const startAtDateFormat = new Date(booking.startAt);
    const startAtYear = startAtDateFormat.getFullYear();
    const startAtMonth = startAtDateFormat.getMonth() + 1;
    const startAtDay = startAtDateFormat.getDate();

    return {
      year: startAtYear,
      month: startAtMonth,
      day: startAtDay,
    };
  }

  bundleBookingData(
    date: { day: number; month: number; year: number },
    booking: Booking,
  ): bundleBookingData {
    const dayData: Day[] = [{ day: date.day, bookings: [booking] }];
    const monthData: Month[] = [{ month: date.month, days: dayData }];
    const yearData: Year = {
      year: date.year,
      months: monthData,
    };

    return {
      dayData,
      yearData,
    };
  }

  fillBookingData(
    bookingDate: BookingDate,
    { dayData, yearData }: bundleBookingData,
    booking: Booking,
    bookingClientSideResponse: BookingClientSideResponse,
  ) {
    const { year, month, day } = bookingDate;
    if (this.isYearAlreadyInResponse(year, bookingClientSideResponse)) {
      const yearDataResponse = this.yearData(bookingClientSideResponse, year);
      const monthIndex = this.dateIndex(yearDataResponse, 'months', month);

      this.monthOperation(
        monthIndex,
        bookingDate,
        dayData,
        booking,
        yearDataResponse,
      );

      const monthDataResponse = this.monthData(yearDataResponse, month);
      const dayIndex = this.dateIndex(monthDataResponse, 'days', day);

      this.dayOperation(dayIndex, day, booking, monthDataResponse);
    } else {
      bookingClientSideResponse.push(yearData);
    }
  }

  monthOperation(
    monthIndex: number,
    { month, day }: BookingDate,
    dayData: Day[],
    booking: Booking,
    yearDataResponse: Year,
  ) {
    if (monthIndex === -1) {
      yearDataResponse.months.push({
        month,
        days: dayData,
      });
    } else {
      yearDataResponse.months[monthIndex].days.push({
        day,
        bookings: [booking],
      });
    }
  }

  dayOperation(
    dayIndex: number,
    day: number,
    booking: Booking,
    monthDataResponse: Month,
  ) {
    if (dayIndex === -1) {
      monthDataResponse.days.push({
        day,
        bookings: [booking],
      });
    } else {
      monthDataResponse.days[dayIndex].bookings.push(booking);
    }
  }

  dateIndex<T>(
    yearDataResponse: T,
    dateParam: BookingDateKey,
    dateToFind: number,
  ): number {
    const dateKey: string = _BOOKING_DATE_PARAM[dateParam];
    const data = yearDataResponse[dateParam];
    return data.findIndex((key: T) => key[dateKey] === dateToFind);
  }

  isYearAlreadyInResponse(year: number, response: Year[]): boolean {
    const yearIndex = response.findIndex((t: Year) => t.year === year);
    return yearIndex !== -1;
  }

  yearData(test: Year[], year: number): Year {
    const actualYear = test.findIndex((t: Year) => t.year === year);
    return test[actualYear];
  }

  monthData(test: Year, month: number): Month {
    const index = test.months.findIndex((m: Month) => m.month === month);
    return test.months[index];
  }
}
