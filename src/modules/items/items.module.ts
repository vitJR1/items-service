import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsAxiosProvider } from './items.axios.provider';
import { AxiosModule } from '../../core/axios/axios.module';

@Module({
  imports: [AxiosModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsAxiosProvider],
})
export class ItemsModule {}
