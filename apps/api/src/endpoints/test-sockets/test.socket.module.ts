import { Module } from "@nestjs/common";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { TestSocketService } from "./test.socket.service";
import { CommonConfigModule } from "@mvx-monorepo/common/config/common.config.module";
import { CommonConfigService } from "@mvx-monorepo/common/config/common.config.service";

@Module({
  imports: [
    CommonConfigModule,
  ],
  providers: [
    TestSocketService,
    {
      provide: 'PUBSUB_SERVICE',
      useFactory: (commonConfigService: CommonConfigService) => {
        const clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            host: commonConfigService.config.redis.host,
            port: commonConfigService.config.redis.port,
            retryDelay: 1000,
            retryAttempts: 10,
            retryStrategy: () => 1000,
          },
        };

        return ClientProxyFactory.create(clientOptions);
      },
      inject: [CommonConfigService],
    },
  ],
  exports: [
    TestSocketService,
  ],
})
export class TestSocketModule { }
