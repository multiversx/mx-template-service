import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiConfigModule } from "../api-config/api.config.module";
import { ApiConfigService } from "../api-config/api.config.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      // eslint-disable-next-line require-await
      useFactory: async (configService: ApiConfigService) => ({
        uri: configService.getNoSQLDatabaseConnection(),
      }),
      inject: [ApiConfigService],
    }),
  ],
  exports: [
  ],
})
export class NoSQLDatabaseModule { }
