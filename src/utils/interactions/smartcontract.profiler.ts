import {
  Query,
  SmartContract,
} from '@elrondnetwork/erdjs/out';
import { ContractQueryResponse, ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { PerformanceProfiler } from '../performance.profiler';

export class SmartContractProfiler extends SmartContract {
  async runQuery(
    provider: ProxyNetworkProvider,
    query: Query,
  ): Promise<ContractQueryResponse> {
    const profiler = new PerformanceProfiler();

    const response = await provider.queryContract(query);

    profiler.stop();

    // MetricsCollector.setExternalCall(
    //   'vm.query',
    //   func.name,
    //   profiler.duration,
    // );

    return response;
  }
}
