import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/endpoints/users/entities/user.entity";
import { ApiConfigModule } from "../../api-config/api.config.module";
import { ApiConfigService } from "../../api-config/api.config.service";
import { MongoDbService } from "./mongo.db.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'mongodb',
          entities: [User],
          url: apiConfigService.getDatabaseUrl(),
          keepConnectionAlive: true,
          sslValidate: false,
          retryAttempts: 300,
          useUnifiedTopology: true,
          synchronize: true,
        };

        return options;
      },
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [MongoDbService],
  exports: [MongoDbService, TypeOrmModule.forFeature([User])],
})
export class MongoDbModule { }
