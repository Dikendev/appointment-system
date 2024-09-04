import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggerServiceAdapter } from '../../../external/logger/infrastructure/logger-service-adapter';

export function globalConfig(app: INestApplication): void {
  app.useLogger(app.get(LoggerServiceAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.enableCors();
}
