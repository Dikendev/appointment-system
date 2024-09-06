import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { Logger, LoggerBaseKey, LoggerKey } from '../domain/logger.repository';
import {
  WinstonLogger,
  WinstonLoggerTransportKey,
} from './winston/winston.logger';
import { LoggerService } from '../domain/logger.service';
import { LoggerServiceAdapter } from './logger-service-adapter';
import { ConfigService } from '../../../config/domain/services/config.service';
import ConsoleTransport from './winston/transports/console-transport';
import { FileTransport } from './winston/transports/file-transport';
import * as morgan from 'morgan';
import { ConfigModule } from '../../../config/infrastructure/nestjs/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    { provide: LoggerBaseKey, useClass: WinstonLogger },
    { provide: LoggerKey, useClass: LoggerService },
    {
      provide: LoggerServiceAdapter,
      useFactory: (logger: Logger) => new LoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
    {
      provide: WinstonLoggerTransportKey,
      useFactory: () => {
        const transports = [];

        transports.push(ConsoleTransport.createColorize());
        transports.push(FileTransport.create());
        return transports;
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerKey, LoggerServiceAdapter],
  controllers: [],
})
export class LoggerModule implements NestModule {
  constructor(
    @Inject(LoggerKey) private logger: Logger,
    private configService: ConfigService,
  ) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(this.configService.isProduction ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
