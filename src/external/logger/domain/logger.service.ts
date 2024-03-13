import { Injectable, Scope } from '@nestjs/common';
import { LogLevel, LogData } from './log';
import { Logger } from './logger.repository';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements Logger {
  private sourceClass: string;
  private organization: string;
  private context: string;
  private app: string;

  log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string,
  ): void {
    throw new Error('Method not implemented.');
  }
  debug(message: string, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  info(message: string, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  warn(message: string | Error, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  error(message: string | Error, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  fatal(message: string | Error, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  emergency(message: string | Error, data?: LogData, profile?: string): void {
    throw new Error('Method not implemented.');
  }
  startProfile(id: string): void {
    throw new Error('Method not implemented.');
  }
}
