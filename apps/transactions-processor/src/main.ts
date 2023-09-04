import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { TransactionProcessorModule } from './processor';
import { ApiConfigService } from '@mvx-monorepo/common';
import { PrivateAppModule } from './private.app.module';

async function bootstrap() {
  const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule);
  const apiConfigService = transactionProcessorApp.get<ApiConfigService>(ApiConfigService);
  await transactionProcessorApp.listen(apiConfigService.getTransactionProcessorFeaturePort());

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
