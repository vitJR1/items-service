import { Injectable } from '@nestjs/common';
import { ItemsAxiosProvider } from './items.axios.provider';
import { ItemsFilterDto } from './dto/items-filter.dto';
import { ItemMinPrice } from './types/item-min-price';

@Injectable()
export class ItemsService {
  constructor(private readonly items: ItemsAxiosProvider) {}

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

    return [...dataMap.values()]; // n * n
  }
}
