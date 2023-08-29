import { Module } from "@nestjs/common";
import { ApiConfigModule, DynamicModuleUtils } from "@mvx-monorepo/common";
import { ExampleService } from "./example.service";
import configuration from "../../../config/configuration";

@Module({
  imports: [
    ApiConfigModule.forRoot(configuration),
    DynamicModuleUtils.getCachingModule(configuration),
  ],
  providers: [
    ExampleService,
  ],
  exports: [
    ExampleService,
  ],
})
export class ExampleModule { }
