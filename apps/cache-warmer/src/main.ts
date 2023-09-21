import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ApiConfigService, PubSubListenerModule } from '@mvx-monorepo/common';
import { CacheWarmerModule } from './cache-warmer';
import { PrivateAppModule } from './private.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import configuration from '../config/configuration';

async function bootstrap() {
  const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
  const apiConfigService = cacheWarmerApp.get<ApiConfigService>(ApiConfigService);
  await cacheWarmerApp.listen(apiConfigService.getCacheWarmerFeaturePort());

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    PubSubListenerModule.forRoot(configuration),
    {
      transport: Transport.REDIS,
      options: {
        host: apiConfigService.getRedisUrl(),
        port: 6379,
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
