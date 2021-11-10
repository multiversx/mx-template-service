import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class TestService {
  private readonly logger: Logger

  constructor(
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
  ) {
    this.logger = new Logger(TestService.name);
  }

  async testSocket(): Promise<void> {
    this.logger.log('emitting onTest event');
    this.clientProxy.emit('onTest', { test: 'test' });
  }
}