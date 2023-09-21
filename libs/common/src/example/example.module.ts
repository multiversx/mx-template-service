import { Module } from "@nestjs/common";
import { ApiConfigModule, DynamicModuleUtils } from "@mvx-monorepo/common";
import { ExampleService } from "./example.service";

@Module({})
export class ExampleModule {
  static forRoot(configuration: () => Record<string, any>) {
    return {
      module: ExampleModule,
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
    };
  }
}
