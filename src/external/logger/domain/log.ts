export enum LogLevel {
  Emergency = 'emergency',
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export interface Log {
  timestamp: number;
  level: LogLevel;
  message: string;
  data: LogData;
}

export interface LogData {
  organization?: string;
  context?: string;
  label?: string;
  stack?: string;
  app?: string;
  sourceClass?: string;
  correlationId?: string;
  error?: Error;
  props?: NodeJS.Dict<any>;
}
