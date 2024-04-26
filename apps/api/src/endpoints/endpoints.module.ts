import { Module } from "@nestjs/common";
import { DynamicModuleUtils } from "@libs/common";
import { AuthModule } from "./auth/auth.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    TokenModule,
    UserModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
})
export class EndpointsModule { }
