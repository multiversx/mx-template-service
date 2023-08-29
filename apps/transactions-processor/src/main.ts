import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { TransactionProcessorModule } from './processor';
import { ApiConfigService } from '@mvx-monorepo/common';

async function bootstrap() {
  const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule);
  const apiConfigService = transactionProcessorApp.get<ApiConfigService>(ApiConfigService);
  await transactionProcessorApp.listen(apiConfigService.getTransactionProcessorFeaturePort());
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
