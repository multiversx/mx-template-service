/* Autogenerated code */

export interface Config {
  apps: {
    api: {
      features: {
        publicApi: {
          enabled: boolean;
          port: number;
        };
        privateApi: {
          enabled: boolean;
          port: number;
        };
      };
      useCachingInterceptor: boolean;
    };
    cacheWarmer: {
      features: {
        cacheWarmer: {
          enabled: boolean;
          port: number;
        };
        privateApi: {
          enabled: boolean;
          port: number;
        };
      };
    };
    queueWorker: {
      port: number;
    };
    transactionsProcessor: {
      port: number;
      maxLookBehind: number;
    };
  };
  libs: {
    common: {
      urls: {
        api: string;
      };
      database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
      };
      redis: {
        host: string;
        port: number;
      };
      nativeAuth: {
        maxExpirySeconds: number;
        acceptedOrigins: string[];
      };
      security: {
        admins: string[];
      };
      rateLimiterSecret?: string;
    };
  };
}
