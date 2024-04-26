import { configuration } from "@mvx-monorepo/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppConfigService {
  readonly config = configuration().apps.transactionsProcessor;
}
