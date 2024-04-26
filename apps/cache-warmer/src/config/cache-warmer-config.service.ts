import { configuration } from "@mvx-monorepo/common/config/configuration";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheWarmerConfigService {
  readonly config = configuration().apps.cacheWarmer;
}
