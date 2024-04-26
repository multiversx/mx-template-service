import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { CommonConfigService, PubSubListenerModule } from '@mvx-monorepo/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const commonConfigService = app.get<CommonConfigService>(CommonConfigService);
  const appConfigService = app.get<AppConfigService>(AppConfigService);

  await app.listen(appConfigService.config.port);

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
