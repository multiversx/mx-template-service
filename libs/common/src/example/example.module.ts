import { Module } from "@nestjs/common";
import { CommonConfigModule, DynamicModuleUtils } from "@libs/common";
import { ExampleService } from "./example.service";

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
