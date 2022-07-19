import { Module } from '@nestjs/common';
import { HealthCheckController } from './endpoints/health-check/health.check.controller';
import { TestSocketController } from './endpoints/test-sockets/test.socket.controller';
import { TestSocketModule } from './endpoints/test-sockets/test.socket.module';
import { CacheController } from './endpoints/caching/cache.controller';
import { ApiMetricsController } from './common/metrics/api.metrics.controller';
import { DynamicModuleUtils } from './utils/dynamic.module.utils';
import { LoggingModule } from '@elrondnetwork/erdnest';
import { ApiMetricsModule } from './common/metrics/api.metrics.module';

@Module({
  imports: [
    ApiMetricsModule,
    DynamicModuleUtils.getCachingModule(),
    LoggingModule,
    TestSocketModule,
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
