import { AbiRegistry, Address, Interaction, SmartContractAbi, TypedOutcomeBundle } from "@elrondnetwork/erdjs/out";
import { ContractQueryResponse, ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { Logger } from "@nestjs/common";
import { SmartContractProfiler } from "src/utils/interactions/smartcontract.profiler";
import { ResultsParser } from "@elrondnetwork/erdjs";
import * as fs from "fs";

export class AbiService {
  private readonly proxy: ProxyNetworkProvider;
  private readonly logger: Logger;
  private readonly abiPath: string;
  private readonly contractInterface: string;
  private contract: SmartContractProfiler | undefined;
  private readonly parser: ResultsParser = new ResultsParser();

  constructor(
    apiUrl: string,
    abiPath: string,
    contractInterface: string,
  ) {
    this.logger = new Logger(AbiService.name);

    this.proxy = new ProxyNetworkProvider(apiUrl);

    this.abiPath = abiPath;
    this.contractInterface = contractInterface;
  }
  public getProxy(): ProxyNetworkProvider {
    return this.proxy;
  }

  async getContract(contractAddress: string): Promise<SmartContractProfiler> {
    if (this.contract) {
      return this.contract;
    }

    try {
      // Load from files
      const jsonContent: string = await fs.promises.readFile(this.abiPath, { encoding: "utf8" });
      const json = JSON.parse(jsonContent);

      const abiRegistry = AbiRegistry.create(json);

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

    return this.contract;
  }

  async runQuery(contract: SmartContractProfiler, interaction: Interaction): Promise<TypedOutcomeBundle> {
    try {

      const queryResponse: ContractQueryResponse = await contract.runQuery(
        this.proxy,
        interaction.buildQuery()
      );

      return this.parser.parseQueryResponse(queryResponse, interaction.getEndpoint());
    } catch (error) {
      this.logger.log(`Unexpected error when running query '${interaction.buildQuery().func}' to sc '${contract.getAddress().bech32()}' `);
      this.logger.error(error);

      throw error;
    }
  }
}
