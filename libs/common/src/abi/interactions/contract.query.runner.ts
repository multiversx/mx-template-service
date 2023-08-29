import { ContractQueryResponse } from "@multiversx/sdk-network-providers";
import { INetworkProvider } from "@multiversx/sdk-network-providers/out/interface";
import { ResultsParser, SmartContract, Interaction, TypedOutcomeBundle } from "@multiversx/sdk-core";
import { Logger } from "@nestjs/common";

export class ContractQueryRunner {
  private readonly logger: Logger;
  private readonly proxy: INetworkProvider;
  private readonly parser: ResultsParser = new ResultsParser();

  constructor(proxy: INetworkProvider) {
    this.logger = new Logger(ContractQueryRunner.name);

    this.proxy = proxy;
  }

  async runQuery(contract: SmartContract, interaction: Interaction): Promise<TypedOutcomeBundle> {
    try {
      const queryResponse: ContractQueryResponse = await this.proxy.queryContract(interaction.buildQuery());

      return this.parser.parseQueryResponse(queryResponse, interaction.getEndpoint());
    } catch (error) {
      this.logger.log(`Unexpected error when running query '${interaction.buildQuery().func}' to sc '${contract.getAddress().bech32()}' `);
      this.logger.error(error);

      throw error;
    }
  }
}
