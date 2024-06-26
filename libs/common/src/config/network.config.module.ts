import { Global, Module } from "@nestjs/common";
import { NetworkConfigService } from "./network.config.service";

@Global()
@Module({
  providers: [
    NetworkConfigService,
  ],
  exports: [
    NetworkConfigService,
  ],
})
export class NetworkConfigModule { }
