import { Module } from '@nestjs/common';
import { MetricsController } from './endpoints/metrics/metrics.controller';
import { PublicAppModule } from './public.app.module';

@Module({
  imports: [
    PublicAppModule
  ],
  controllers: [
    MetricsController
  ],
  providers: [
    
  ],
})
export class PrivateAppModule {}
