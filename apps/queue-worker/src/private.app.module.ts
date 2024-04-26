import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { QueueWorkerConfigModule } from './config/queue-worker-config.module';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    QueueWorkerConfigModule,
    CommonConfigModule,
  ],
  providers: [],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class PrivateAppModule { }
