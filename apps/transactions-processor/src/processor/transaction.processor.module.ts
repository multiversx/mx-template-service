import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonConfigModule, DynamicModuleUtils } from '@mvx-monorepo/common';
import { TransactionProcessorService } from './transaction.processor.service';
import { TransactionsProcessorConfigModule } from '../config/transactions-processor-config.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DynamicModuleUtils.getCachingModule(),
    TransactionsProcessorConfigModule,
    CommonConfigModule,
  ],
  providers: [
    TransactionProcessorService,
  ],
})
export class TransactionProcessorModule { }
