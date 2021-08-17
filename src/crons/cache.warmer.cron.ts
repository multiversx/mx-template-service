import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CachingService } from "src/common/caching.service";
import { ClientProxy } from "@nestjs/microservices";
import { ExampleService } from "src/endpoints/example/example.service";
import { Locker } from "src/common/utils/locker";
import { Constants } from "src/common/utils/constants";

@Injectable()
export class CacheWarmerCron {
  constructor(
    private readonly cachingService: CachingService,
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
    private readonly exampleService: ExampleService,
  ) { }

  @Cron('* * * * *')
  async handleExampleInvalidations() {
    await Locker.lock('Example invalidations', async () => {
      let examples = await this.exampleService.getAllExamplesRaw();
      await this.invalidateKey('examples', examples, Constants.oneHour());
    }, true);
  }

  private async invalidateKey(key: string, data: any, ttl: number) {
    await Promise.all([
      this.cachingService.setCache(key, data, ttl),
      this.deleteCacheKey(key),
    ]);
  }

  private async deleteCacheKey(key: string) {
    await this.clientProxy.emit('deleteCacheKeys', [ key ]);
  }
}