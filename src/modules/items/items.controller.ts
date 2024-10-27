import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ItemsFilterDto } from './dto/items-filter.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
@ApiTags('Items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiBearerAuth('JWT')
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  findAll(@Query() itemsFilterDto: ItemsFilterDto) {
    return this.itemsService.findAll(itemsFilterDto);
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }
}
