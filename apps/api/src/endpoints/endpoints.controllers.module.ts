import { Module } from "@nestjs/common";
import { DynamicModuleUtils } from "@mvx-monorepo/common";
import { AuthController } from "./auth/auth.controller";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { ExampleController } from "@mvx-monorepo/common";
import { HealthCheckController } from "./health-check/health.check.controller";
import { TokensController } from "./tokens/token.controller";
import { UsersController } from "./users/user.controller";

@Module({
  imports: [
    EndpointsServicesModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
  controllers: [
    AuthController, ExampleController, HealthCheckController, UsersController, TokensController,
  ],
})
export class EndpointsControllersModule { }
