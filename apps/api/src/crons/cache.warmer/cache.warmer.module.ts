import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EndpointsServicesModule } from '../../endpoints/endpoints.services.module';
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils';
import { CacheWarmerService } from './cache.warmer.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EndpointsServicesModule,
  ],
  providers: [
    DynamicModuleUtils.getPubSubService(),
    CacheWarmerService,
  ],
})
export class CacheWarmerModule { }
