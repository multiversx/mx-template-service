import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { CommonConfigService, PubSubListenerModule } from '@mvx-monorepo/common';
import { CacheWarmerModule } from './cache-warmer';
import { PrivateAppModule } from './private.app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CacheWarmerConfigService } from './config/cache-warmer-config.service';

async function bootstrap() {
  const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
  const commonConfigService = cacheWarmerApp.get<CommonConfigService>(CommonConfigService);
  const cacheWarmerConfigService = cacheWarmerApp.get<CacheWarmerConfigService>(CacheWarmerConfigService);
  await cacheWarmerApp.listen(cacheWarmerConfigService.config.features.cacheWarmer.port);

  if (cacheWarmerConfigService.config.features.privateApi.enabled) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(cacheWarmerConfigService.config.features.privateApi.port);
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
