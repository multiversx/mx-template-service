import { Global, Module } from "@nestjs/common";
import { CommonConfigService } from "./common.config.service";

@Global()
@Module({
  providers: [
    CommonConfigService,
  ],
  exports: [
    CommonConfigService,
  ],
})
export class CommonConfigModule { }
