import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { PurchaseListFiterDto } from './dto/purchase-list-fiter.dto';

@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('purchases')
@ApiTags('Purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Req() req: any, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto, req.user.id);
  }

  @Get()
  findAll(@Query() purchaseListFiterDto: PurchaseListFiterDto) {
    return this.purchasesService.findAll(purchaseListFiterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(+id);
  }
}
