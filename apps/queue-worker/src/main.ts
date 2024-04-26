import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { CommonConfigService, PubSubListenerModule } from '@mvx-monorepo/common';
import { QueueWorkerModule } from './worker';
import { PrivateAppModule } from './private.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { QueueWorkerConfigService } from './config/queue-worker-config.service';

async function bootstrap() {
  const queueWorkerApp = await NestFactory.create(QueueWorkerModule);
  const queueWorkerConfigService = queueWorkerApp.get<QueueWorkerConfigService>(QueueWorkerConfigService);
  const commonConfigService = queueWorkerApp.get<CommonConfigService>(CommonConfigService);
  await queueWorkerApp.listen(queueWorkerConfigService.config.features.queueWorker.port);

  if (queueWorkerConfigService.config.features.privateApi.enabled) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(queueWorkerConfigService.config.features.privateApi.port);
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
