import { Module } from "@nestjs/common";
import { ApiConfigModule } from "src/common/api-config/api.config.module";
import { DynamicModuleUtils } from "src/utils/dynamic.module.utils";
import { ExampleService } from "./example.service";

@Module({
  imports: [
    ApiConfigModule,
    DynamicModuleUtils.getCachingModule(),
  ],
  providers: [
    ExampleService,
  ],
  exports: [
    ExampleService,
  ],
})
export class ExampleModule { }
