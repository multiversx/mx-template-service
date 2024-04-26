import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { TransactionProcessorModule } from './processor';
import { CommonConfigService, PubSubListenerModule } from '@mvx-monorepo/common';
import { PrivateAppModule } from './private.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TransactionsProcessorConfigService } from './config/transactions-processor-config.service';

async function bootstrap() {
  const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule);
  const transactionsProcessorConfigService = transactionProcessorApp.get<TransactionsProcessorConfigService>(TransactionsProcessorConfigService);
  const commonConfigService = transactionProcessorApp.get<CommonConfigService>(CommonConfigService);

  await transactionProcessorApp.listen(transactionsProcessorConfigService.config.features.transactionsProcessor.port);

  if (transactionsProcessorConfigService.config.features.privateApi.enabled) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(transactionsProcessorConfigService.config.features.privateApi.port);
  }

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    PubSubListenerModule.forRoot(),
    {
      transport: Transport.REDIS,
      options: {
        host: commonConfigService.config.redis.host,
        port: commonConfigService.config.redis.port,
        retryAttempts: 100,
        retryDelay: 1000,
        retryStrategy: () => 1000,
      },
    },
  );
  pubSubApp.useLogger(pubSubApp.get(WINSTON_MODULE_NEST_PROVIDER));
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  pubSubApp.listen();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
