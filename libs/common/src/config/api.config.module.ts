import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiConfigService } from "./api.config.service";

@Global()
@Module({})
export class ApiConfigModule {
  static forRoot(configFactory: () => Record<string, any>) {
    return {
      module: ApiConfigModule,
      imports: [
        ConfigModule.forRoot({
          load: [configFactory],
        }),
      ],
      providers: [
        ApiConfigService,
      ],
      exports: [
        ApiConfigService,
      ],
    };
  }
}
