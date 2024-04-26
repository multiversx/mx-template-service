import { Module } from '@nestjs/common';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module';
import { DynamicModuleUtils } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import { CommonConfigModule } from '@mvx-monorepo/common/config/common.config.module';

@Module({
  imports: [
    LoggingModule,
    EndpointsServicesModule,
    EndpointsControllersModule,
    CommonConfigModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
  exports: [
    EndpointsServicesModule,
  ],
})
export class PublicAppModule { }
