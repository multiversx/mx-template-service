import { Global, Module } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { DatabaseModule } from '@libs/database';

@Global()
@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    TokenService,
    UserService,
  ],
  exports: [
    TokenService,
    UserService,
  ],
})
export class ServicesModule { }
