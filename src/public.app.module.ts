import { Module } from '@nestjs/common';
import "./utils/extensions/array.extensions";
import "./utils/extensions/date.extensions";
import "./utils/extensions/number.extensions";
import { CommonModule } from './common/common.module';
import { LoggingModule } from './common/logging/logging.module';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controller';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    LoggingModule,
    CommonModule,
    DatabaseModule,
    EndpointsServicesModule,
    EndpointsControllersModule,
  ],
})
export class PublicAppModule { }
