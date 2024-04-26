import { DynamicModule, Module } from '@nestjs/common';
import { PubSubListenerController } from './pub.sub.listener.controller';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { CommonConfigModule } from '../config';
import { DynamicModuleUtils } from '../utils';

@Module({})
export class PubSubListenerModule {
  static forRoot(): DynamicModule {
    return {
      module: PubSubListenerModule,
      imports: [
        LoggingModule,
        CommonConfigModule,
        DynamicModuleUtils.getCachingModule(),
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
