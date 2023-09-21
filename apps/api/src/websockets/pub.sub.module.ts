import { Module } from '@nestjs/common';
import { PubSubListenerController, PubSubListenerModule } from '@mvx-monorepo/common';
import { EventsGateway } from './events.gateway';
import { PubSubController } from './pub.sub.controller';
import configuration from '../../config/configuration';

@Module({
  imports: [
    PubSubListenerModule.forRoot(configuration),
  ],
  controllers: [
    PubSubController, PubSubListenerController,
  ],
  providers: [
    EventsGateway,
  ],
})
export class PubSubModule { }
