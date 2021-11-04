import { forwardRef, Module } from "@nestjs/common";
import { ExampleModule } from "./example/example.module";


@Module({
  imports: [
    forwardRef(() => ExampleModule), 
  ],
  exports: [
    ExampleModule,
  ]
})
export class EndpointsServicesModule { }