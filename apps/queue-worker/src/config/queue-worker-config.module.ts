import { Global, Module } from "@nestjs/common";
import { QueueWorkerConfigService } from "./queue-worker-config.service";

@Global()
@Module({
  providers: [
    QueueWorkerConfigService,
  ],
  exports: [
    QueueWorkerConfigService,
  ],
})
export class QueueWorkerConfigModule { }
