import { INestApplication } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('NestJS', {
    prettyPrint: true,
  }),
);

export const loggerConfig = {
  transports: [
    // Console transport
    new winston.transports.Console({
      format: logFormat,
    }),

    // Error logs - file transport
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format: logFormat,
    }),

    // Combined logs - file transport
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: logFormat,
    }),
  ],
};

export function setupLogger(app: INestApplication): void {
  app.useLogger(WinstonModule.createLogger(loggerConfig));
}
