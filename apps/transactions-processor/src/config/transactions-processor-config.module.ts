import { Global, Module } from "@nestjs/common";
import { TransactionsProcessorConfigService } from "./transactions-processor-config.service";

@Global()
@Module({
  providers: [
    TransactionsProcessorConfigService,
  ],
  exports: [
    TransactionsProcessorConfigService,
  ],
})
export class TransactionsProcessorConfigModule { }
