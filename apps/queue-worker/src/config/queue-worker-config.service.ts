import { configuration } from "@mvx-monorepo/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class QueueWorkerConfigService {
  readonly config = configuration().apps.queueWorker;
}
