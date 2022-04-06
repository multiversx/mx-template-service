import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/endpoints/users/entities/user.entity";
import { ApiConfigModule } from "../../api-config/api.config.module";
import { ApiConfigService } from "../../api-config/api.config.service";
import { DatabaseService } from "./database.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => ({
        type: 'mysql',
        entities: [User],
        ...apiConfigService.getDatabaseConnection(),
        keepConnectionAlive: true,
        synchronize: true,
        retryAttempts: 300,
        extra: {
          connectionLimit: 4,
        },
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService, TypeOrmModule.forFeature([User])],
})
export class DatabaseModule { }
