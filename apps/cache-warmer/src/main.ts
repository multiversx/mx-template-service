import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ApiConfigService } from '@mvx-monorepo/common';
import { CacheWarmerModule } from './cache-warmer';

async function bootstrap() {
  const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
  const apiConfigService = cacheWarmerApp.get<ApiConfigService>(ApiConfigService);
  await cacheWarmerApp.listen(apiConfigService.getCacheWarmerFeaturePort());
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
