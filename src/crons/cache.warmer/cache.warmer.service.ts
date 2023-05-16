import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ClientProxy } from "@nestjs/microservices";
import { ExampleService } from "src/endpoints/example/example.service";
import { CacheService } from "@multiversx/sdk-nestjs-cache";
import { Locker } from "@multiversx/sdk-nestjs-common";
import { CacheInfo } from "src/utils/cache.info";

@Injectable()
export class CacheWarmerService {
  constructor(
    private readonly cachingService: CacheService,
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
    private readonly exampleService: ExampleService,
  ) { }

  @Cron('* * * * *')
  async handleExampleInvalidations() {
    await Locker.lock('Example invalidations', async () => {
      const examples = await this.exampleService.getAllExamplesRaw();
      await this.invalidateKey(CacheInfo.Examples.key, examples, CacheInfo.Examples.ttl);
    }, true);
  }

  private async invalidateKey<T>(key: string, data: T, ttl: number) {
    await Promise.all([
      this.cachingService.set(key, data, ttl),
      this.deleteCacheKey(key),
    ]);
  }

  private async deleteCacheKey(key: string) {
    await this.clientProxy.emit('deleteCacheKeys', [key]);
  }
}
