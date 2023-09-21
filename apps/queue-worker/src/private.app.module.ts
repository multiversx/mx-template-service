import { Module } from '@nestjs/common';
import { ApiConfigModule, ApiMetricsController, HealthCheckController } from '@mvx-monorepo/common';
import { ApiMetricsModule } from '@mvx-monorepo/common';
import { LoggingModule } from '@multiversx/sdk-nestjs-common';
import configuration from '../config/configuration';

@Module({
  imports: [
    LoggingModule,
    ApiMetricsModule,
    ApiConfigModule.forRoot(configuration),
  ],
  providers: [],
  controllers: [
    ApiMetricsController,
    HealthCheckController,
  ],
})
export class PrivateAppModule { }
