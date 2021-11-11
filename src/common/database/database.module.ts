import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiConfigModule } from "../api-config/api.config.module";
import { ApiConfigService } from "../api-config/api.config.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => ({  
          type: 'mysql',
          host: apiConfigService.getDatabaseHost(),
          port: apiConfigService.getDatabasePort(),
          username: apiConfigService.getDatabaseUsername(),
          password: apiConfigService.getDatabasePassword(),
          database: apiConfigService.getDatabaseName(),
          autoLoadEntities: true,
      }),
      inject: [ApiConfigService],
    })
  ]
})
export class DatabseModule{}