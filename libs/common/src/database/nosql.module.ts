import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonConfigModule, CommonConfigService } from "../config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [CommonConfigModule],
      useFactory: (configService: CommonConfigService) => ({
        uri: `mongodb://${configService.config.database.host}:27017/${configService.config.database.name}`,
      }),
      inject: [CommonConfigService],
    }),
  ],
  exports: [
  ],
})
export class NoSQLDatabaseModule { }
