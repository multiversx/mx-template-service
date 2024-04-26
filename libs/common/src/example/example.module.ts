import { Module } from "@nestjs/common";
import { ExampleService } from "./example.service";
import { DynamicModuleUtils } from "../utils";
import { CommonConfigModule } from "../config";

@Module({})
export class ExampleModule {
  static forRoot() {
    return {
      module: ExampleModule,
      imports: [
        CommonConfigModule,
        DynamicModuleUtils.getCachingModule(),
      ],
      providers: [
        ExampleService,
      ],
      exports: [
        ExampleService,
      ],
    };
  }
}
