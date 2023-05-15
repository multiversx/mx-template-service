import { CacheService } from "@multiversx/sdk-nestjs-cache";
import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class PubSubListenerController {
  private logger: Logger;

  constructor(
    private readonly cacheService: CacheService,
  ) {
    this.logger = new Logger(PubSubListenerController.name);
  }

  @EventPattern('deleteCacheKeys')
  async deleteCacheKey(keys: string[]) {
    for (const key of keys) {
      this.logger.log(`Deleting local cache key ${key}`);
      await this.cacheService.deleteLocal(key);
    }
  }
}
