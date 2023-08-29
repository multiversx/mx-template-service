import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiConfigService, ApiConfigModule } from "../config";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";

@Module({})
export class DatabaseModule {
  static forRoot(entities: EntityClassOrSchema[]) {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ApiConfigModule],
          useFactory: (apiConfigService: ApiConfigService) => ({
            type: 'mysql',
            ...apiConfigService.getDatabaseConnection(),
            entities: entities,
            keepConnectionAlive: true,
            synchronize: true,
          }),
          inject: [ApiConfigService],
        }),
        TypeOrmModule.forFeature(entities),
      ],
      exports: [
        TypeOrmModule.forFeature(entities),
      ],
    };
  }
}
