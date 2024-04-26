import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { CommonConfigModule, CommonConfigService } from "../config";

@Module({})
export class DatabaseModule {
  static forRoot(entities: EntityClassOrSchema[]) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [CommonConfigModule],
          useFactory: (apiConfigService: CommonConfigService) => ({
            type: 'mysql',
            host: apiConfigService.config.database.host,
            port: apiConfigService.config.database.port,
            username: apiConfigService.config.database.username,
            password: apiConfigService.config.database.password,
            database: apiConfigService.config.database.name,
            entities: entities,
            keepConnectionAlive: true,
            synchronize: true,
          }),
          inject: [CommonConfigService],
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [
        TypeOrmModule.forFeature(entities),
      ],
    };
  }
}
