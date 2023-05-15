import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import { ApiConfigService } from './common/api-config/api.config.service';
import { PrivateAppModule } from './private.app.module';
import { PublicAppModule } from './public.app.module';
import * as bodyParser from 'body-parser';
import { Logger, NestInterceptor } from '@nestjs/common';
import { QueueWorkerModule } from './workers/queue.worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SocketAdapter } from './websockets/socket.adapter';
import cookieParser from 'cookie-parser';
import { CacheWarmerModule } from './crons/cache.warmer/cache.warmer.module';
import { TransactionProcessorModule } from './crons/transaction.processor/transaction.processor.module';
import { PubSubListenerModule } from './common/pubsub/pub.sub.listener.module';
import { SdkNestjsConfigServiceImpl } from './common/api-config/sdk.nestjs.config.service.impl';
import { LoggingInterceptor, MetricsService } from '@multiversx/sdk-nestjs-monitoring';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { LoggerInitializer } from '@multiversx/sdk-nestjs-common';
import { CacheService, CachingInterceptor } from '@multiversx/sdk-nestjs-cache';

import '@multiversx/sdk-nestjs-common/lib/utils/extensions/array.extensions';
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/date.extensions';
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/number.extensions';
import '@multiversx/sdk-nestjs-common/lib/utils/extensions/string.extensions';

async function bootstrap() {
  const publicApp = await NestFactory.create(PublicAppModule);
  publicApp.use(bodyParser.json({ limit: '1mb' }));
  publicApp.enableCors();
  publicApp.useLogger(publicApp.get(WINSTON_MODULE_NEST_PROVIDER));
  publicApp.use(cookieParser());

  const apiConfigService = publicApp.get<ApiConfigService>(ApiConfigService);
  const cachingService = publicApp.get<CacheService>(CacheService);
  const metricsService = publicApp.get<MetricsService>(MetricsService);
  const httpAdapterHostService = publicApp.get<HttpAdapterHost>(HttpAdapterHost);

  if (apiConfigService.getIsAuthActive()) {
    publicApp.useGlobalGuards(new NativeAuthGuard(new SdkNestjsConfigServiceImpl(apiConfigService), cachingService));
  }

  const httpServer = httpAdapterHostService.httpAdapter.getHttpServer();
  httpServer.keepAliveTimeout = apiConfigService.getServerTimeout();
  httpServer.headersTimeout = apiConfigService.getHeadersTimeout(); //`keepAliveTimeout + server's expected response time`

  const globalInterceptors: NestInterceptor[] = [];
  globalInterceptors.push(new LoggingInterceptor(metricsService));

  if (apiConfigService.getUseCachingInterceptor()) {
    const cachingInterceptor = new CachingInterceptor(
      cachingService,
      httpAdapterHostService,
      metricsService,
    );

    globalInterceptors.push(cachingInterceptor);
  }

  publicApp.useGlobalInterceptors(...globalInterceptors);

  const description = readFileSync(join(__dirname, '..', 'docs', 'swagger.md'), 'utf8');

  let documentBuilder = new DocumentBuilder()
    .setTitle('MultiversX Microservice API')
    .setDescription(description)
    .setVersion('1.0.0')
    .setExternalDoc('MultiversX Docs', 'https://docs.multiversx.com');

  const apiUrls = apiConfigService.getSwaggerUrls();
  for (const apiUrl of apiUrls) {
    documentBuilder = documentBuilder.addServer(apiUrl);
  }

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(publicApp, config);
  SwaggerModule.setup('', publicApp, document);

  if (apiConfigService.getIsPublicApiFeatureActive()) {
    await publicApp.listen(apiConfigService.getPublicApiFeaturePort());
  }

  if (apiConfigService.getIsPrivateApiFeatureActive()) {
    const privateApp = await NestFactory.create(PrivateAppModule);
    await privateApp.listen(apiConfigService.getPrivateApiFeaturePort());
  }

  if (apiConfigService.getIsCacheWarmerFeatureActive()) {
    const cacheWarmerApp = await NestFactory.create(CacheWarmerModule);
    await cacheWarmerApp.listen(apiConfigService.getCacheWarmerFeaturePort());
  }

  if (apiConfigService.getIsTransactionProcessorFeatureActive()) {
    const transactionProcessorApp = await NestFactory.create(TransactionProcessorModule);
    await transactionProcessorApp.listen(apiConfigService.getTransactionProcessorFeaturePort());
  }

  if (apiConfigService.getIsQueueWorkerFeatureActive()) {
    const queueWorkerApp = await NestFactory.create(QueueWorkerModule);
    await queueWorkerApp.listen(8000);
  }

  const logger = new Logger('Bootstrapper');

  LoggerInitializer.initialize(logger);

  const pubSubApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    PubSubListenerModule,
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
  pubSubApp.useWebSocketAdapter(new SocketAdapter(pubSubApp));
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  pubSubApp.listen();

  logger.log(`Public API active: ${apiConfigService.getIsPublicApiFeatureActive()}`);
  logger.log(`Private API active: ${apiConfigService.getIsPrivateApiFeatureActive()}`);
  logger.log(`Transaction processor active: ${apiConfigService.getIsTransactionProcessorFeatureActive()}`);
  logger.log(`Cache warmer active: ${apiConfigService.getIsCacheWarmerFeatureActive()}`);
  logger.log(`Queue worker active: ${apiConfigService.getIsQueueWorkerFeatureActive()}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
