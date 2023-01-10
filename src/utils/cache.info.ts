import { Constants } from "@multiversx/erdnest";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;
}
