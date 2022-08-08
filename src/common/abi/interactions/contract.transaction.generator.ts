import { NetworkConfig } from "@elrondnetwork/erdjs-network-providers/out";
import { INetworkProvider } from "@elrondnetwork/erdjs-network-providers/out/interface";
import { IAddress, Interaction, Transaction } from "@elrondnetwork/erdjs/out";
import { Logger } from "@nestjs/common";

export class ContractTransactionGenerator {
  private readonly logger: Logger;
  private readonly proxy: INetworkProvider;
  private networkConfig: NetworkConfig | undefined = undefined;

  constructor(proxy: INetworkProvider) {
    this.logger = new Logger(ContractTransactionGenerator.name);

    this.proxy = proxy;
  }

  private async loadNetworkConfig(): Promise<NetworkConfig> {
    try {
      const networkConfig: NetworkConfig = await this.proxy.getNetworkConfig();

      return networkConfig;
    } catch (error) {
      this.logger.log(`Unexpected error when trying to load network config`);
      this.logger.error(error);

      throw new Error('Error when loading network config');
    }
  }

  private async getNetworkConfig(): Promise<NetworkConfig> {
    if (!this.networkConfig) {
      this.networkConfig = await this.loadNetworkConfig();
    }

    return this.networkConfig;
  }

  async createTransaction(interaction: Interaction, signerAddress: IAddress): Promise<Transaction> {
    try {
      const transaction: Transaction = interaction.buildTransaction();

      const signerAccount = await this.proxy.getAccount(signerAddress);
      transaction.setNonce(signerAccount.nonce.valueOf());

      const networkConfig: NetworkConfig = await this.getNetworkConfig();
      transaction.setChainID(networkConfig.ChainID);

      return transaction;
    } catch (error) {
      this.logger.log(`Unexpected error when trying to create transaction '${interaction.getFunction().valueOf()}' to contract '${interaction.getContractAddress().bech32()}'`);
      this.logger.error(error);

      throw error;
    }
  }
}
