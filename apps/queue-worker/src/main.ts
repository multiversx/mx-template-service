import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ApiConfigService } from '@mvx-monorepo/common';
import { QueueWorkerModule } from './worker';
import { PrivateAppModule } from './private.app.module';

async function bootstrap() {
  const queueWorkerApp = await NestFactory.create(QueueWorkerModule);
  const apiConfigService = queueWorkerApp.get<ApiConfigService>(ApiConfigService);
  await queueWorkerApp.listen(apiConfigService.getQueueWorkerFeaturePort());

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
