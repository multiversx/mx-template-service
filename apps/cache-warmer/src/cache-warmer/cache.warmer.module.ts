import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonConfigModule, ExampleModule } from '@mvx-monorepo/common';
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils';
import { CacheWarmerService } from './cache.warmer.service';
import { CacheWarmerConfigModule } from '../config/cache-warmer-config.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ExampleModule.forRoot(),
    CacheWarmerConfigModule,
    CommonConfigModule,
  ],
  providers: [
    DynamicModuleUtils.getPubSubService(),
    CacheWarmerService,
  ],
})
export class CacheWarmerModule { }
