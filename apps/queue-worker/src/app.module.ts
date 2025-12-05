import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, HealthCheckController } from '@libs/common';
import { ApiMetricsModule } from '@libs/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { AppConfigModule } from './config/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExampleQueuePrintService } from './worker/queues/example.queue.print.service';
import { ExampleQueueAddService } from './worker/queues/example.queue.add.service';
import { BullModule } from '@nestjs/bull';
import { BullQueueModule } from './worker/bull.queue.module';
import { WorkerService } from './worker/worker.service';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    AppConfigModule,
    CommonConfigModule,
    ScheduleModule.forRoot(),
    BullQueueModule,
    BullModule.registerQueue(
      { name: 'exampleQueuePrint' },
      { name: 'exampleQueueAdd' },
    ),
  ],
  providers: [
    WorkerService,
    ExampleQueuePrintService,
    ExampleQueueAddService,
  ],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class AppModule { }
