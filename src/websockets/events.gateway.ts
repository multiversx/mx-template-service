import { Injectable, Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

@Injectable()
@WebSocketGateway(3005)
export class EventsGateway {
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(EventsGateway.name);
  }

  @WebSocketServer()
  webSocketServer: Server | undefined

  onBatchUpdated(address: string, batchId: string, txHashes: string[]) {
    this.logger.log(`publishing websocket event batchUpdated:${batchId} with txHashes ${txHashes}`);
    this.webSocketServer?.emit(`batchUpdated:${address}`, { batchId, txHashes }); 
  }

  onTest(payload: any) {
    this.logger.log(`Received onTest event with payload '${JSON.stringify(payload)}'`);
    this.webSocketServer?.emit('test', payload);
  }
}