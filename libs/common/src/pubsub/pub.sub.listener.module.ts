import { DynamicModule, Module } from '@nestjs/common';
import { DynamicModuleUtils } from '@mvx-monorepo/common/utils/dynamic.module.utils';
import { ApiConfigModule } from '../config/api.config.module';
import { PubSubListenerController } from './pub.sub.listener.controller';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';

@Module({})
export class PubSubListenerModule {
  static forRoot(configuration: () => Record<string, any>): DynamicModule {
    return {
      module: PubSubListenerModule,
      imports: [
        LoggingModule,
        ApiConfigModule,
        DynamicModuleUtils.getCachingModule(configuration),
      ],
      controllers: [
        PubSubListenerController,
      ],
      providers: [
        DynamicModuleUtils.getPubSubService(),
      ],
      exports: ['PUBSUB_SERVICE'],
    };
  }
}
