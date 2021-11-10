import { Module } from "@nestjs/common";
import { ExampleModule } from "./example/example.module";
import { TestModule } from "./test/test.module";

@Module({
  imports: [
    ExampleModule, 
    TestModule,
  ],
  exports: [
    ExampleModule, TestModule,
  ]
})
export class EndpointsServicesModule { }