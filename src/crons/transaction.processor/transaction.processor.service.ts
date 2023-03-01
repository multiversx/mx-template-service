
import { TransactionProcessor } from "@multiversx/sdk-transaction-processor";
import { CachingService, Constants, Locker } from "@multiversx/sdk-nestjs";
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
    await Locker.lock('newTransactions', async () => {
      await this.transactionProcessor.start({
        gatewayUrl: this.apiConfigService.getApiUrl(),
        maxLookBehind: this.apiConfigService.getTransactionProcessorMaxLookBehind(),
        // eslint-disable-next-line require-await
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
