import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ExampleModule } from '@mvx-monorepo/common';
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils';
import { CacheWarmerService } from './cache.warmer.service';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ExampleModule.forRoot(configuration),
  ],
  providers: [
    DynamicModuleUtils.getPubSubService(),
    CacheWarmerService,
  ],
})
export class CacheWarmerModule { }
