import { Constants } from "@multiversx/sdk-nestjs";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;
}
