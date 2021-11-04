import { forwardRef, Module } from "@nestjs/common";
import { MetricsModule } from "src/common/metrics/metrics.module";
import { ApiConfigModule } from "../../../../api.elrond.com/src/common/api-config/api.config.module";
import { ApiService } from "../../../../api.elrond.com/src/common/network/api.service";


@Module({
  imports: [
    ApiConfigModule,
    forwardRef(() => MetricsModule)
  ],
  providers: [
    ApiService
  ],
  exports: [
    ApiService
  ]
})
export class ApiModule { }