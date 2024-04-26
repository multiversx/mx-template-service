import { Module } from '@nestjs/common';
import { ServicesModule } from '@libs/services/services.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    ServicesModule,
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule { }
