import { Controller, Get } from '@nestjs/common';
import { AppService, StatusApi } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  status(): StatusApi {
    return this.appService.statusApi();
  }
}
