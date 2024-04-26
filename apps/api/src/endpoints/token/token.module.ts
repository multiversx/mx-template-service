import { ServicesModule } from '@libs/services/services.module';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';

@Module({
  imports: [
    ServicesModule,
  ],
  controllers: [
    TokenController,
  ],
})
export class TokenModule { }
