import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ExceptionFilter } from './infrastructure/filter/exception.filter';
import { PrismaExceptionFilter } from './infrastructure/prisma-exception/prisma-exception.filter';
import { globalConfig } from './config/infrastructure/nestjs/global.config';

(async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  globalConfig(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new ExceptionFilter(),
    new PrismaExceptionFilter(httpAdapter),
  );

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);

  const logger = new Logger('NestApplication');
  logger.log(`Server running on http://localhost:${process.env.PORT}`);
})();
