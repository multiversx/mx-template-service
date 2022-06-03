import { AbiRegistry, Address, Interaction, IProvider, NetworkConfig, ProxyProvider, QueryResponseBundle, SmartContractAbi } from "@elrondnetwork/erdjs/out";
import { Logger } from "@nestjs/common";
import { SmartContractProfiler } from "src/utils/interactions/smartcontract.profiler";

export class AbiService {
  private readonly proxy: IProvider;
  private readonly logger: Logger;
  private readonly abiPath: string;
  private readonly contractInterface: string;
  private contract: SmartContractProfiler | undefined;

  constructor(
    apiUrl: string,
    abiPath: string,
    contractInterface: string,
  ) {
    this.logger = new Logger(AbiService.name);

    this.proxy = new ProxyProvider(apiUrl);

    this.abiPath = abiPath;
    this.contractInterface = contractInterface;
  }
  public getProxy(): IProvider {
    return this.proxy;
  }

  async getContract(contractAddress: string): Promise<SmartContractProfiler> {
    if (!this.contract) {
      try {
        const abiRegistry = await AbiRegistry.load({
          files: [this.abiPath],
        });

        const abi = new SmartContractAbi(abiRegistry, [this.contractInterface]);

        this.contract = new SmartContractProfiler({
          address: new Address(contractAddress),
          abi: abi,
        });
      } catch (error) {
        this.logger.log(`Unexpected error when trying to create smart contract from abi`);
        this.logger.error(error);

        throw new Error('Error when creating contract from abi');
      }
    }
    return this.contract;
  }

  async runQuery(contract: SmartContractProfiler, interaction: Interaction): Promise<QueryResponseBundle> {
    try {
      await NetworkConfig.getDefault().sync(this.proxy);

      const queryResponse = await contract.runQuery(
        this.proxy,
        interaction.buildQuery()
      );

      return interaction.interpretQueryResponse(queryResponse);
    } catch (error) {
      this.logger.log(`Unexpected error when running query '${interaction.buildQuery().func}' to sc '${contract.getAddress().bech32()}' `);
      this.logger.error(error);

      throw error;
    }
  }
}
