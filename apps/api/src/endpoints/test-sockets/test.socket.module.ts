import { Module } from "@nestjs/common";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ApiConfigModule, ApiConfigService } from "@mvx-monorepo/common";
import { TestSocketService } from "./test.socket.service";
import configuration from "../../../config/configuration";

@Module({
  imports: [
    ApiConfigModule.forRoot(configuration),
  ],
  providers: [
    TestSocketService,
    {
      provide: 'PUBSUB_SERVICE',
      useFactory: (apiConfigService: ApiConfigService) => {
        const clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            host: apiConfigService.getRedisUrl(),
            port: 6379,
            retryDelay: 1000,
            retryAttempts: 10,
            retryStrategy: () => 1000,
          },
        };

        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ApiConfigService],
    },
  ],
  exports: [
    TestSocketService,
  ],
})
export class TestSocketModule { }
