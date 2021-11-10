import { forwardRef, Module } from "@nestjs/common";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { CommonModule } from "src/common/common.module";
import { TestService } from "./test.service";

@Module({
  imports: [
    forwardRef(() => CommonModule),
  ],
  providers: [
    TestService,
    {
      provide: 'PUBSUB_SERVICE',
      useFactory: (apiConfigService: ApiConfigService) => {
        let clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            url: `redis://${apiConfigService.getRedisUrl()}:6379`,
            retryDelay: 1000,
            retryAttempts: 10,
            retry_strategy: function(_: any) {
              return 1000;
            },
          }
        };

        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ ApiConfigService ]
    }
  ],
  exports: [
    TestService
  ]
})
export class TestModule { }