import { Inject, Injectable } from '@nestjs/common';
import { ItemsAxiosProvider } from './items.axios.provider';
import { ItemsFilterDto } from './dto/items-filter.dto';
import { ItemMinPrice } from './types/item-min-price';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEMS_REPOSITORY')
    private readonly itemRepository: Repository<Item>,
    private readonly items: ItemsAxiosProvider,
  ) {}

  async findAll(itemsFilterDto: ItemsFilterDto) {
    const [tradableItems, untradeableItems] = await Promise.all([
      this.items.getItems({
        app_id: itemsFilterDto.app_id,
        currency: itemsFilterDto.currency,
        tradable: true,
      }),
      this.items.getItems({
        app_id: itemsFilterDto.app_id,
        currency: itemsFilterDto.currency,
        tradable: false,
      }),
    ]);

    const dataMap = new Map<string, ItemMinPrice>();

    tradableItems.map(async (ti) => {
      dataMap.set(ti.market_hash_name, {
        market_hash_name: ti.market_hash_name,
        tradable_price: ti.min_price,
        untradable_price: undefined,
      });
    });

    untradeableItems.map(async (uti) => {
      let ti: ItemMinPrice = dataMap.get(uti.market_hash_name);

      if (ti) {
        ti.untradable_price = uti.min_price;
      } else {
        ti = {
          market_hash_name: uti.market_hash_name,
          tradable_price: undefined,
          untradable_price: uti.min_price,
        };
      }

      dataMap.set(uti.market_hash_name, ti);
    });

    return [...dataMap.values()];
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save(createItemDto);
  }
}
