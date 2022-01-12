import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BullQueueModule } from './bull.queue.module';
import { QueueWorkerService } from './queue.worker.service';
import { ExampleQueueService } from './queues/example.queue.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullQueueModule,
    BullModule.registerQueue({
      name: 'exampleQueue',
    }),
  ],
  providers: [
    QueueWorkerService, ExampleQueueService,
  ],
  exports: [
    QueueWorkerService, ExampleQueueService,
  ],
})
export class QueueWorkerModule { }
