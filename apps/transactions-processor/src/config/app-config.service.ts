import { configuration } from "@libs/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppConfigService {
  readonly config = configuration().apps.transactionsProcessor;
}
