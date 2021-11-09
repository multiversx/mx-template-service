import { Module } from '@nestjs/common';
import { ExampleQueueModule } from './queues/example.queue.module';

@Module({
  imports: [
    ExampleQueueModule,
  ],
})
export class QueueWorkerModule {}
