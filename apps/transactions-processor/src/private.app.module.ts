import { Module } from '@nestjs/common';
import { ApiMetricsController, CommonConfigModule, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { TransactionsProcessorConfigModule } from './config/transactions-processor-config.module';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    TransactionsProcessorConfigModule,
    CommonConfigModule,
  ],
  providers: [],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class PrivateAppModule { }
