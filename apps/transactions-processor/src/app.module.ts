import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, DynamicModuleUtils, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { AppConfigModule } from './config/app-config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionProcessorService } from './processor/transaction.processor.service';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    AppConfigModule,
    CommonConfigModule,
    ScheduleModule.forRoot(),
    DynamicModuleUtils.getCachingModule(),
  ],
  providers: [
    TransactionProcessorService,
  ],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class AppModule { }
