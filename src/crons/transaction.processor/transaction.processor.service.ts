
import { TransactionProcessor } from "@elrondnetwork/transaction-processor";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { CachingService, Locker } from "@elrondnetwork/erdnest";
import { ApiMetricsService } from "src/common/metrics/api.metrics.service";
import { CacheInfo } from "src/utils/cache.info";

@Injectable()
export class TransactionProcessorService {
  private transactionProcessor: TransactionProcessor = new TransactionProcessor();
  private readonly logger: Logger;

  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly cachingService: CachingService,
    private readonly metricsService: ApiMetricsService,
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
          return await this.cachingService.getCache<number>(CacheInfo.TransactionProcessorShardNonce(shardId).key);
        },
        setLastProcessedNonce: async (shardId, nonce) => {
          this.metricsService.setLastProcessedNonce(shardId, nonce);
          await this.cachingService.setCache<number>(CacheInfo.TransactionProcessorShardNonce(shardId).key, nonce, CacheInfo.TransactionProcessorShardNonce(shardId).ttl);
        },
      });
    });
  }
}
