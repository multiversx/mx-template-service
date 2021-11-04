import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import configuration from '../config/configuration';
import { ApiConfigService } from './common/api-config/api.config.service';
import { ApiService } from './common/network/api.service';
import { CachingService } from './common/caching.service';
import { AuthController } from './endpoints/auth/auth.controller';
import { ExampleController } from './endpoints/example/example.controller';
import { ExampleService } from './endpoints/example/example.service';
import { MetricsService } from './common/metrics/metrics.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    CacheModule.register(),
    WinstonModule.forRoot({
      level: 'verbose',
      format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
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
          symlinkName: 'application.log',
          format: winston.format.json()
        }),
      ]
    }),
  ],
  controllers: [
    ExampleController, AuthController
  ],
  providers: [
    ExampleService, ApiConfigService, MetricsService, CachingService, ApiService
  ],
  exports: [
    ApiConfigService, MetricsService, CachingService, ExampleService
  ],
})
export class PublicAppModule {}
