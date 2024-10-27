import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsAxiosProvider } from './items.axios.provider';
import { AxiosModule } from '../../core/axios/axios.module';
import { itemsProvider } from './items.provider';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule, AxiosModule],
  controllers: [ItemsController],
  providers: [...itemsProvider, ItemsService, ItemsAxiosProvider],
  exports: [ItemsService],
})
export class ItemsModule {}
