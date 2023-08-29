import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ApiConfigService } from '@mvx-monorepo/common';
import { QueueWorkerModule } from './worker';

async function bootstrap() {
  const queueWorkerApp = await NestFactory.create(QueueWorkerModule);
  const apiConfigService = queueWorkerApp.get<ApiConfigService>(ApiConfigService);
  await queueWorkerApp.listen(apiConfigService.getQueueWorkerFeaturePort());
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
