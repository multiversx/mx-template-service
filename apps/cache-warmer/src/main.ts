import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ApiConfigService } from '@mvx-monorepo/common';
import { CacheWarmerModule } from './cache-warmer';
import { PrivateAppModule } from './private.app.module';

async function bootstrap() {
  const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
  const apiConfigService = cacheWarmerApp.get<ApiConfigService>(ApiConfigService);
  await cacheWarmerApp.listen(apiConfigService.getCacheWarmerFeaturePort());

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
