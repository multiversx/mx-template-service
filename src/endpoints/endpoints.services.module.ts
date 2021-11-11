import { Module } from "@nestjs/common";
import { ExampleModule } from "./example/example.module";
import { TestSocketModule } from "./test-sockets/test.socket.module";

@Module({
  imports: [
    ExampleModule, 
    TestSocketModule,
  ],
  exports: [
    ExampleModule, TestSocketModule,
  ]
})
export class EndpointsServicesModule { }