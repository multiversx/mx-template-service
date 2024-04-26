import { Module } from '@nestjs/common';
import { TestSocketController } from './endpoints/test-sockets/test.socket.controller';
import { TestSocketModule } from './endpoints/test-sockets/test.socket.module';
import { CacheController } from './endpoints/caching/cache.controller';
import { ApiMetricsController, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule, DynamicModuleUtils } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { CommonConfigModule } from '@mvx-monorepo/common/config/common.config.module';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    DynamicModuleUtils.getCachingModule(),
    TestSocketModule,
    CommonConfigModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
    DynamicModuleUtils.getPubSubService(),
  ],
  controllers: [
    ApiMetricsController,
    CacheController,
    HealthCheckController,
    TestSocketController,
  ],
})
export class PrivateAppModule { }
