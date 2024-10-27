import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiTags } from '@nestjs/swagger';
import { ItemsFilterDto } from './dto/items-filter.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll(@Query() itemsFilterDto: ItemsFilterDto) {
    return this.itemsService.findAll(itemsFilterDto);
  }
}
