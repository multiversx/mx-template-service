import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ApiConfigModule, ApiConfigService } from '@mvx-monorepo/common';
import configuration from '../../config/configuration';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (apiConfigService: ApiConfigService) => ({
        redis: {
          host: apiConfigService.getRedisUrl(),
          port: 6379,
        },
      }),
      imports: [ApiConfigModule.forRoot(configuration)],
      inject: [ApiConfigService],
    }),
  ],
})
export class BullQueueModule { }
