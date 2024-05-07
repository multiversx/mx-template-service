import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, DynamicModuleUtils, ExampleModule, HealthCheckController } from '@libs/common';
import { ApiMetricsModule } from '@libs/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { AppConfigModule } from './config/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WarmerService } from './warmer/warmer.service';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    ScheduleModule.forRoot(),
    CommonConfigModule,
    AppConfigModule,
    ExampleModule.forRoot(),
  ],
  providers: [
    DynamicModuleUtils.getPubSubService(),
    WarmerService,
  ],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class AppModule { }
