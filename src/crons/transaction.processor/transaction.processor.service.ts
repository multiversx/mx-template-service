
import { TransactionProcessor } from "@elrondnetwork/transaction-processor";
import { CachingService, Constants, Locker } from "@multiversx/erdnest";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ApiConfigService } from "src/common/api-config/api.config.service";

@Injectable()
export class TransactionProcessorService {
  private transactionProcessor: TransactionProcessor = new TransactionProcessor();
  private readonly logger: Logger;

  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly cachingService: CachingService
  ) {
    this.logger = new Logger(TransactionProcessorService.name);
  }

  @Cron('*/1 * * * * *')
  async handleNewTransactions() {
    Locker.lock('newTransactions', async () => {
      await this.transactionProcessor.start({
        gatewayUrl: this.apiConfigService.getApiUrl(),
        maxLookBehind: this.apiConfigService.getTransactionProcessorMaxLookBehind(),
        onTransactionsReceived: async (shardId, nonce, transactions, statistics) => {
          this.logger.log(`Received ${transactions.length} transactions on shard ${shardId} and nonce ${nonce}. Time left: ${statistics.secondsLeft}`);
        },
        getLastProcessedNonce: async (shardId) => {
          return await this.cachingService.getCacheRemote(`lastProcessedNonce:${shardId}`);
        },
        setLastProcessedNonce: async (shardId, nonce) => {
          await this.cachingService.setCacheRemote(`lastProcessedNonce:${shardId}`, nonce, Constants.oneMonth());
        },
      });
    });
  }
}
