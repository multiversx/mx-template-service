import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  getApiUrl(): string {
    const apiUrl = this.configService.get<string>('urls.api');
    if (!apiUrl) {
      throw new Error('No API url present');
    }

    return apiUrl;
  }

  getSwaggerUrls(): string[] {
    const swaggerUrls = this.configService.get<string[]>('urls.swagger');
    if (!swaggerUrls) {
      throw new Error('No swagger urls present');
    }

    return swaggerUrls;
  }

  getRedisUrl(): string {
    const redisUrl = this.configService.get<string>('urls.redis');
    if (!redisUrl) {
      throw new Error('No redisUrl present');
    }

    return redisUrl;
  }

  getIsPublicApiFeatureActive(): boolean {
    let isApiActive = this.configService.get<boolean>('features.publicApi.enabled');
    if (isApiActive === undefined) {
      throw new Error('No public api feature flag present');
    }

    return isApiActive;
  }

  getPublicApiFeaturePort(): number {
    let featurePort = this.configService.get<number>('features.publicApi.port');
    if (featurePort === undefined) {
      throw new Error('No public api port present');
    }

    return featurePort;
  }

  getIsPrivateApiFeatureActive(): boolean {
    let isApiActive = this.configService.get<boolean>('features.privateApi.enabled');
    if (isApiActive === undefined) {
      throw new Error('No private api feature flag present');
    }

    return isApiActive;
  }

  getPrivateApiFeaturePort(): number {
    let featurePort = this.configService.get<number>('features.privateApi.port');
    if (featurePort === undefined) {
      throw new Error('No private api port present');
    }

    return featurePort;
  }

  getIsCacheWarmerFeatureActive(): boolean {
    let isCacheWarmerActive = this.configService.get<boolean>('features.cacheWarmer.enabled');
    if (isCacheWarmerActive === undefined) {
      throw new Error('No cache warmer feature flag present');
    }

    return isCacheWarmerActive;
  }

  getCacheWarmerFeaturePort(): number {
    let featurePort = this.configService.get<number>('features.cacheWarmer.port');
    if (featurePort === undefined) {
      throw new Error('No cache warmer port present');
    }

    return featurePort;
  }

  getIsTransactionProcessorFeatureActive(): boolean {
    let isTransactionProcessorActive = this.configService.get<boolean>('features.transactionProcessor.enabled');
    if (isTransactionProcessorActive === undefined) {
      throw new Error('No transaction processor feature flag present');
    }

    return isTransactionProcessorActive;
  }

  getTransactionProcessorFeaturePort(): number {
    let featurePort = this.configService.get<number>('features.transactionProcessor.port');
    if (featurePort === undefined) {
      throw new Error('No transaction processor port present');
    }

    return featurePort;
  }

  getTransactionProcessorMaxLookBehind(): number {
    let maxLookBehind = this.configService.get<number>('features.transactionProcessor.maxLookBehind');
    if (maxLookBehind === undefined) {
      throw new Error('No transaction processor max look behind present');
    }

    return maxLookBehind;
  }

  getJwtSecret(): string {
    const jwtSecret = this.configService.get<string>('security.jwtSecret');
    if (!jwtSecret) {
      throw new Error('No jwtSecret present');
    }

    return jwtSecret;
  }

  getSecurityAdmins(): string[] {
    let admins = this.configService.get<string[]>('security.admins');
    if (admins === undefined) {
      throw new Error('No security admins value present');
    }

    return admins;
  }
}