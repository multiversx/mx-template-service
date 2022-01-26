import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoSQLDatabaseModule } from 'src/common/database/nosql.module';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from './token.service';

@Module({
  imports: [NoSQLDatabaseModule, MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }