import { Module } from '@nestjs/common';
import { DynamicModuleUtils } from 'src/utils/dynamic.module.utils';
import { ApiConfigModule } from '../api-config/api.config.module';
import { PubSubListenerController } from './pub.sub.listener.controller';

@Module({
  imports: [
    ApiConfigModule,
    DynamicModuleUtils.getCachingModule(),
  ],
  controllers: [
    PubSubListenerController,
  ],
  providers: [
    DynamicModuleUtils.getPubSubService(),
  ],
  exports: ['PUBSUB_SERVICE'],
})
export class PubSubListenerModule { }
