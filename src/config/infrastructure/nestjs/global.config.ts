import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggerServiceAdapter } from '../../../external/logger/infrastructure/logger-service-adapter';
import * as cookieParser from 'cookie-parser';

export function globalConfig(app: INestApplication): void {
  app.useLogger(app.get(LoggerServiceAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableShutdownHooks();
  app.enableCors();
}
