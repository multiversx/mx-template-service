import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CommonConfigModule, CommonConfigService } from '@libs/common';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (commonConfigService: CommonConfigService) => ({
        redis: {
          host: commonConfigService.config.redis.host,
          port: commonConfigService.config.redis.port,
        },
      }),
      imports: [CommonConfigModule],
      inject: [CommonConfigService],
    }),
  ],
})
export class BullQueueModule { }
