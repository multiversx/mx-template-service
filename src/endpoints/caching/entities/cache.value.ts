import { Constants } from "@multiversx/erdnest";

export class CacheValue {
  value?: string;
  ttl: number = Constants.oneSecond() * 6;
}
