import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { BullQueueModule } from '../bull.queue.module';
import { ExampleQueueService } from './example.queue.service';

@Module({
  imports: [
    forwardRef(() => CommonModule),
    BullQueueModule,
    BullModule.registerQueue({
      name: 'exampleQueue',
    }),
  ],
  providers: [
    ExampleQueueService,
  ],
})
export class ExampleQueueModule {}
