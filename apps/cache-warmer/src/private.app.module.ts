import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { CacheWarmerConfigModule } from './config/cache-warmer-config.module';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    CommonConfigModule,
    CacheWarmerConfigModule,
  ],
  providers: [],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class PrivateAppModule { }
