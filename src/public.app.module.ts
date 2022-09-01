import { Module } from '@nestjs/common';
import '@elrondnetwork/erdnest/lib/src/utils/extensions/array.extensions';
import '@elrondnetwork/erdnest/lib/src/utils/extensions/date.extensions';
import '@elrondnetwork/erdnest/lib/src/utils/extensions/number.extensions';
import '@elrondnetwork/erdnest/lib/src/utils/extensions/string.extensions';
import { LoggingModule } from '@elrondnetwork/erdnest';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module';
import { DynamicModuleUtils } from './utils/dynamic.module.utils';

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
