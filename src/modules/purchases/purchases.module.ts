import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { purchasesProvider } from './purchases.provider';
import { DatabaseModule } from '../../core/database/database.module';
import { ItemsModule } from '../items/items.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, ItemsModule, UsersModule],
  controllers: [PurchasesController],
  providers: [...purchasesProvider, PurchasesService],
})
export class PurchasesModule {}
