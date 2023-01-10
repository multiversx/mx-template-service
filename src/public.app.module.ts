import { Module } from '@nestjs/common';
import '@multiversx/erdnest/lib/src/utils/extensions/array.extensions';
import '@multiversx/erdnest/lib/src/utils/extensions/date.extensions';
import '@multiversx/erdnest/lib/src/utils/extensions/number.extensions';
import '@multiversx/erdnest/lib/src/utils/extensions/string.extensions';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module';
import { DynamicModuleUtils } from './utils/dynamic.module.utils';
import { LoggingModule } from '@multiversx/erdnest';

@Module({
  imports: [
    LoggingModule,
    EndpointsServicesModule,
    EndpointsControllersModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
  exports: [
    EndpointsServicesModule,
  ],
})
export class PublicAppModule { }
