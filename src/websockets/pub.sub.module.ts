import { Module } from '@nestjs/common';
import { PubSubListenerController } from 'src/common/pubsub/pub.sub.listener.controller';
import { PubSubListenerModule } from 'src/common/pubsub/pub.sub.listener.module';
import { EventsGateway } from './events.gateway';
import { PubSubController } from './pub.sub.controller';

@Module({
  imports: [
    PubSubListenerModule,
  ],
  controllers: [
    PubSubController, PubSubListenerController,
  ],
  providers: [
    EventsGateway,
  ],
})
export class PubSubModule { }
