import { CacheModuleAsyncOptions } from '@nestjs/common/cache';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('cache.host'),
        port: parseInt(configService.get<string>('cache.port')!),
      },
      ttl: configService.get('cache.ttl'),
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
