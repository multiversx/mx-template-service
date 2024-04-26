import { configuration } from "@mvx-monorepo/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionsProcessorConfigService {
  readonly config = configuration().apps.transactionsProcessor;
}
