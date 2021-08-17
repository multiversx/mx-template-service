import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  getApiUrls(): string[] {
    const apiUrls = this.configService.get<string[]>('urls.api');
    if (!apiUrls) {
      throw new Error('No API urls present');
    }

    return apiUrls;
  }

  getIsPublicApiActive(): boolean {
    let isApiActive = this.configService.get<boolean>('api.public');
    if (isApiActive === undefined) {
      throw new Error('No api.public flag present');
    }

    return isApiActive;
  }

  getIsPrivateApiActive(): boolean {
    let isApiActive = this.configService.get<boolean>('api.private');
    if (isApiActive === undefined) {
      throw new Error('No api.private flag present');
    }

    return isApiActive;
  }
}