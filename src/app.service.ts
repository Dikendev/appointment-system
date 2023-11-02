import { Injectable } from '@nestjs/common';

export interface StatusApi {
  status: string;
}

@Injectable()
export class AppService {
  statusApi(): StatusApi {
    return { status: `${new Date()} OK` };
  }
}
