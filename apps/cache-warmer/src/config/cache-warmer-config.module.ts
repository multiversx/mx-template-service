import { Global, Module } from "@nestjs/common";
import { CacheWarmerConfigService } from "./cache-warmer-config.service";

@Global()
@Module({
  providers: [
    CacheWarmerConfigService,
  ],
  exports: [
    CacheWarmerConfigService,
  ],
})
export class CacheWarmerConfigModule { }
