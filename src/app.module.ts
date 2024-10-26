import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemsModule } from './modules/items/items.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { RedisOptions } from './core/redis';
import { ConfigModule } from '@nestjs/config';
import { config } from './core/config';
import typeorm from './core/config/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, typeorm],
    }),
    CacheModule.registerAsync(RedisOptions),
    UsersModule,
    AuthModule,
    ItemsModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
