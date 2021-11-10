import { Module } from '@nestjs/common';
import { CachingModule } from './common/caching/caching.module';
import { MetricsController } from './common/metrics/metrics.controller';
import { MetricsModule } from './common/metrics/metrics.module';
import { ApiConfigModule } from './common/api-config/api.config.module';
import { CacheController } from './common/caching/cache.controller';
import { HealthCheckController } from './endpoints/health-check/health.check.controller';
import { MicroserviceModule } from './common/microservice/microservice.module';
import { TestController } from './endpoints/test/test.controller';
import { TestModule } from './endpoints/test/test.module';


@Module({
  imports: [
    ApiConfigModule,
    CachingModule,
    MetricsModule,
    MicroserviceModule,
    TestModule,
  ],
  controllers: [
    MetricsController,
    CacheController,
    HealthCheckController,
    TestController,
  ],
})
export class PrivateAppModule {}
