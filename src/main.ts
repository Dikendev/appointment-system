import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerServiceAdapter } from './external/logger/infrastructure/logger-service-adapter';

(async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerServiceAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.enableCors();
  await app.listen(3000);
})();
