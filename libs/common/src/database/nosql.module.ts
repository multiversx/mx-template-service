import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiConfigModule, ApiConfigService } from "../config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (configService: ApiConfigService) => ({
        uri: configService.getNoSQLDatabaseConnection(),
      }),
      inject: [ApiConfigService],
    }),
  ],
  exports: [
  ],
})
export class NoSQLDatabaseModule { }
