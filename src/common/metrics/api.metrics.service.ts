import { MetricsService } from "@multiversx/sdk-nestjs-monitoring";
import { Injectable } from "@nestjs/common";
import { register, Gauge } from 'prom-client';

@Injectable()
export class ApiMetricsService {
  private static lastProcessedNonceGauge: Gauge<string>;

  constructor(
    private readonly metricsService: MetricsService,
  ) {
    if (!ApiMetricsService.lastProcessedNonceGauge) {
      ApiMetricsService.lastProcessedNonceGauge = new Gauge({
        name: 'last_processed_nonce',
        help: 'Last processed nonce of the given shard',
        labelNames: ['shardId'],
      });
    }
  }

  setLastProcessedNonce(shardId: number, nonce: number) {
    ApiMetricsService.lastProcessedNonceGauge.set({ shardId }, nonce);
  }

  async getMetrics(): Promise<string> {
    const baseMetrics = await this.metricsService.getMetrics();
    const currentMetrics = await register.metrics();

    return baseMetrics + '\n' + currentMetrics;
  }
}
