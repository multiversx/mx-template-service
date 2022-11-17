import { Constants } from "@elrondnetwork/erdnest";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;

  static Examples: CacheInfo = {
    key: "examples",
    ttl: Constants.oneHour(),
  };

  static TransactionProcessorShardNonce(shard: number): CacheInfo {
    return {
      key: `shardNonce:${shard}`,
      ttl: Number.MAX_SAFE_INTEGER,
    };
  }
}
