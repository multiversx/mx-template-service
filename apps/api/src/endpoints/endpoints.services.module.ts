import { Module } from "@nestjs/common";
import { ExampleModule } from "@mvx-monorepo/common";
import { TestSocketModule } from "./test-sockets/test.socket.module";
import { TokenModule } from "./tokens/token.module";
import { UsersModule } from "./users/user.module";
import configuration from "../../config/configuration";

@Module({
  imports: [
    ExampleModule.forRoot(configuration),
    TestSocketModule,
    UsersModule,
    TokenModule,
  ],
  exports: [
    ExampleModule, TestSocketModule, UsersModule, TokenModule,
  ],
})
export class EndpointsServicesModule { }
