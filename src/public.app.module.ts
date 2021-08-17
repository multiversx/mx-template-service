import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import configuration from '../config/configuration';
import { ApiConfigService } from './common/api.config.service';
import { AuthController } from './endpoints/auth/auth.controller';
import { ExampleController } from './endpoints/example/example.controller';
import { ExampleService } from './endpoints/example/example.service';
import { MetricsService } from './endpoints/metrics/metrics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    CacheModule.register(),
    WinstonModule.forRoot({
      level: 'verbose',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console({ level: 'info' }),
        new DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          createSymlink: true,
          dirname: 'dist/logs',
          symlinkName: 'application.log'
        }),
      ]
    }),
  ],
  controllers: [
    ExampleController, AuthController
  ],
  providers: [
    ExampleService, ApiConfigService, MetricsService
  ],
  exports: [
    ApiConfigService, MetricsService
  ],
})
export class PublicAppModule {}
