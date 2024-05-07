import { CommonConfigModule, CommonConfigService } from '@libs/common';
import { Token, TokenSchema, User, UserSchema } from '@libs/entities';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenRepository } from './repositories/token.repository';
import { UserRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: (configService: CommonConfigService) => ({
        uri: `mongodb://${configService.config.database.host}:${configService.config.database.port}`,
        dbName: configService.config.database.name,
        user: configService.config.database.username,
        pass: configService.config.database.password,
        tlsAllowInvalidCertificates: configService.config.database.tlsAllowInvalidCertificates,
      }),
      inject: [CommonConfigService],
    }),
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    TokenRepository,
    UserRepository,
  ],
  exports: [
    TokenRepository,
    UserRepository,
  ],
})
export class DatabaseModule { }
