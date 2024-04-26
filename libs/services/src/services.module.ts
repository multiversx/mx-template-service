import { Global, Module } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { DatabaseModule } from '@libs/database';
import { ExampleService } from './example/example.service';
import { DynamicModuleUtils } from '@libs/common';

@Global()
@Module({
  imports: [
    DatabaseModule,
    DynamicModuleUtils.getCachingModule(),
  ],
  providers: [
    TokenService,
    UserService,
    ExampleService,
  ],
  exports: [
    TokenService,
    UserService,
    ExampleService,
  ],
})
export class ServicesModule { }
