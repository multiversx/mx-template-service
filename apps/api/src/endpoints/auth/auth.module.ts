import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DynamicModuleUtils } from '@libs/common';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
})
export class AuthModule { }
