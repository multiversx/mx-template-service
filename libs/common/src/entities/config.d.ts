/* Autogenerated code */

export interface Config {
  apps: {
    api: {
      port: number;
      privatePort: number;
      useCachingInterceptor: boolean;
    };
    cacheWarmer: {
      port: number;
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
        username?: string;
        password?: string;
        name: string;
        tlsAllowInvalidCertificates: boolean;
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
