import { configuration } from "@mvx-monorepo/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApiConfigService {
  readonly config = configuration().apps.api;
}
