import { Controller, Get, Header } from '@nestjs/common';
import { ApiMetricsService } from './api.metrics.service';
import { register } from 'prom-client';

@Controller()
export class ApiMetricsController {
  constructor(
    private readonly metricsService: ApiMetricsService,
  ) { }

  @Get('/metrics')
  @Header('Content-Type', register.contentType)
  async getMetrics(): Promise<string> {
    return await this.metricsService.getMetrics();
  }
}
