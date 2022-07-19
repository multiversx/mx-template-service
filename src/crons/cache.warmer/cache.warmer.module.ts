import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from 'src/common/common.module';
import { MicroserviceModule } from 'src/common/microservice/microservice.module';
import { EndpointsServicesModule } from 'src/endpoints/endpoints.services.module';
import { CacheWarmerService } from './cache.warmer.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    forwardRef(() => CommonModule),
    forwardRef(() => EndpointsServicesModule),
    MicroserviceModule,
  ],
  providers: [
    CacheWarmerService,
  ],
})
export class CacheWarmerModule { }
