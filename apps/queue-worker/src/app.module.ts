import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { AppConfigModule } from './config/app-config.module';
import { ExampleQueueService } from './worker/queues/example.queue.service';
import { BullModule } from '@nestjs/bull';
import { BullQueueModule } from './worker/bull.queue.module';
import { WorkerService } from './worker/worker.service';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    AppConfigModule,
    CommonConfigModule,
    BullQueueModule,
    BullModule.registerQueue({
      name: 'exampleQueue',
    }),
  ],
  providers: [
    WorkerService,
    ExampleQueueService,
  ],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class AppModule { }
