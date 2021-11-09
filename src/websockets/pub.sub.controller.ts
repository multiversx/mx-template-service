import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { EventsGateway } from "./events.gateway";

@Controller()
export class PubSubController {
  private readonly logger: Logger

  constructor(
    private readonly eventsGateway: EventsGateway,
  ) {
    this.logger = new Logger(PubSubController.name);
  }

  @EventPattern('onBatchUpdated')
  async onBatchUpdated(payload: { address: string, batchId: string, txHashes: string[] }) {
    this.logger.log(`Notifying batch updated for address ${payload.address}, batch id '${payload.batchId}', hashes ${payload.txHashes}`);
    this.eventsGateway.onBatchUpdated(payload.address, payload.batchId, payload.txHashes);
  }

  @EventPattern('onTest')
  async onTest(payload: any) {
    this.logger.log(`Notifying onTest with payload '${JSON.stringify(payload)}'`);
    this.eventsGateway.onTest(payload);
  }
}