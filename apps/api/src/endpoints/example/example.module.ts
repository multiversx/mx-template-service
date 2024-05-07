import { Module } from "@nestjs/common";
import { ServicesModule } from "@libs/services/services.module";
import { ExampleController } from "./example.controller";

@Module({
  imports: [
    ServicesModule,
  ],
  controllers: [
    ExampleController,
  ],
})
export class ExampleModule { }
