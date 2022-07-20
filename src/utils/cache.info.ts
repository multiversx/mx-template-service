import { Constants } from "@elrondnetwork/erdnest";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;
}
